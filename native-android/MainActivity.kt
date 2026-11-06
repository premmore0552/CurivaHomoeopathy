package com.curiva.homoeopathy

import android.content.Context
import android.content.SharedPreferences
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay
import org.json.JSONArray
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import kotlin.math.roundToInt

private val Green = Color(0xFF087F70)
private val Deep = Color(0xFF164B40)
private val Mint = Color(0xFFE6F4EC)
private val Canvas = Color(0xFFF5F8F5)
private val Ink = Color(0xFF172A24)
private val Muted = Color(0xFF6C7E75)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val library = runCatching { LearningLibrary.load(applicationContext) }
            .getOrElse { LearningLibrary.failure(it.message ?: "Offline content could not be loaded.") }
        setContent {
            MaterialTheme(colorScheme = lightColorScheme(
                primary = Green, onPrimary = Color.White, secondary = Deep,
                background = Canvas, surface = Color.White, onSurface = Ink, onBackground = Ink
            )) {
                CurivaApp(library, getSharedPreferences("curiva_learning", Context.MODE_PRIVATE))
            }
        }
    }
}

private data class Chapter(val title: String, val tag: String)
private data class Subject(
    val id: String, val title: String, val year: String, val category: String,
    val summary: String, val examPattern: String, val chapters: List<Chapter>, val highYield: List<String>
)
private data class NoteSection(val heading: String, val body: String)
private data class Lesson(
    val id: String, val title: String, val subjectId: String, val subject: String,
    val year: String, val overview: String, val importance: String,
    val sections: List<NoteSection>, val points: List<String>
)
private data class Question(
    val id: String, val subject: String, val prompt: String, val options: List<String>,
    val answer: Int, val explanation: String
)
private data class Flashcard(val term: String, val type: String, val definition: String, val significance: String)
private data class Remedy(
    val id: String, val name: String, val commonName: String, val family: String,
    val keynotes: List<String>, val mind: List<String>, val physical: List<String>,
    val better: List<String>, val worse: List<String>
)
private data class Rubric(val symptom: String, val category: String, val remedies: List<String>, val notes: String)
private data class RepertoryChapter(val id: String, val name: String, val description: String, val rubrics: List<Rubric>)
private data class LearningLibrary(
    val subjects: List<Subject>, val lessons: List<Lesson>, val questions: List<Question>,
    val cards: List<Flashcard>, val remedies: List<Remedy>, val repertory: List<RepertoryChapter>,
    val error: String? = null
) {
    companion object {
        fun failure(message: String) = LearningLibrary(emptyList(), emptyList(), emptyList(), emptyList(), emptyList(), emptyList(), message)
        fun load(context: Context): LearningLibrary {
            val root = JSONObject(context.assets.open("learning-content.json").bufferedReader().use { it.readText() })
            require(root.optInt("schemaVersion") == 1) { "Unsupported offline library version." }
            return LearningLibrary(
                root.array("subjects").map { o ->
                    Subject(o.str("id"), o.str("title"), o.str("year"), o.str("category"), o.str("summary"), o.str("examPattern"),
                        o.array("chapters").map { Chapter(it.str("title"), it.str("tag")) }, o.strings("highYieldTopics"))
                },
                root.array("detailedLessons").map { o ->
                    Lesson(o.str("id"), o.str("title"), o.str("subjectId"), o.str("subject"), o.str("year"),
                        o.str("overview"), o.str("importance"),
                        o.array("sections").map { NoteSection(it.str("heading"), it.str("body")) }, o.strings("keyPoints"))
                },
                root.array("questions").map { o ->
                    Question(o.str("id"), o.str("subject"), o.str("prompt"), o.strings("options"), o.optInt("answer"),
                        o.str("explanation"))
                },
                root.array("flashcards").map { Flashcard(it.str("term"), it.str("subType"), it.str("definition"), it.str("significance")) },
                root.array("remedies").map { o ->
                    Remedy(o.str("id"), o.str("name"), o.str("commonName"), o.str("family"), o.strings("keynotes"),
                        o.strings("mind"), o.strings("physical"), o.strings("better"), o.strings("worse"))
                },
                root.array("repertory").map { o ->
                    RepertoryChapter(o.str("id"), o.str("name"), o.str("description"),
                        o.array("rubrics").map { r -> Rubric(r.str("symptom"), r.str("subCategory"), r.strings("remedies"), r.str("notes")) })
                }
            )
        }
    }
}
private fun JSONObject.str(key: String) = optString(key, "").takeUnless { it == "null" } ?: ""
private fun JSONObject.array(key: String): List<JSONObject> {
    val array = optJSONArray(key) ?: JSONArray()
    return (0 until array.length()).mapNotNull { array.optJSONObject(it) }
}
private fun JSONObject.strings(key: String): List<String> {
    val array = optJSONArray(key) ?: JSONArray()
    return (0 until array.length()).mapNotNull { array.optString(it, "").takeIf(String::isNotBlank) }
}

private enum class Tab(val label: String, val icon: ImageVector) {
    Home("Home", Icons.Filled.Home), Learn("Learn", Icons.Filled.MenuBook),
    Practice("Practice", Icons.Filled.Quiz), Cards("Cards", Icons.Filled.Style),
    Library("Library", Icons.Filled.LibraryBooks), Progress("Progress", Icons.Filled.TrendingUp)
}
private val planItems = listOf("Complete one lesson", "Attempt a 10-question quiz", "Review 10 flashcards", "Revise one remedy profile")

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun CurivaApp(data: LearningLibrary, prefs: SharedPreferences) {
    var tab by rememberSaveable { mutableStateOf(Tab.Home.name) }
    var screen by rememberSaveable { mutableStateOf("") }
    var query by rememberSaveable { mutableStateOf("") }
    var year by rememberSaveable { mutableStateOf("All years") }
    var libraryMode by rememberSaveable { mutableStateOf("Materia Medica") }
    var selectedSubjectId by rememberSaveable { mutableStateOf("") }
    var selectedLessonId by rememberSaveable { mutableStateOf("") }
    var chapterTitle by rememberSaveable { mutableStateOf("") }
    var selectedRemedyId by rememberSaveable { mutableStateOf("") }
    var selectedRepertoryId by rememberSaveable { mutableStateOf("") }
    var learner by rememberSaveable { mutableStateOf(prefs.getString("learner", "Learner") ?: "Learner") }
    var completed by remember { mutableStateOf(prefs.getStringSet("completed", emptySet())?.toSet() ?: emptySet()) }
    var known by remember { mutableStateOf(prefs.getStringSet("known", emptySet())?.toSet() ?: emptySet()) }
    var saved by remember { mutableStateOf(prefs.getStringSet("saved", emptySet())?.toSet() ?: emptySet()) }
    val today = remember { SimpleDateFormat("yyyy-MM-dd", Locale.US).format(Date()) }
    var planDone by remember { mutableStateOf(prefs.getStringSet("plan_" + today, emptySet())?.toSet() ?: emptySet()) }
    var dailyGoal by rememberSaveable { mutableIntStateOf(prefs.getInt("daily_goal", 30)) }
    var attempts by rememberSaveable { mutableIntStateOf(prefs.getInt("attempts", 0)) }
    var lastPercent by rememberSaveable { mutableIntStateOf(prefs.getInt("last_percent", 0)) }

    var flashIndex by rememberSaveable { mutableIntStateOf(0) }
    var flashFlipped by rememberSaveable { mutableStateOf(false) }
    var flashFilter by rememberSaveable { mutableStateOf("All types") }
    var quizSubject by rememberSaveable { mutableStateOf("All subjects") }
    var timed by rememberSaveable { mutableStateOf(false) }
    var quiz by remember { mutableStateOf(emptyList<Question>()) }
    var quizIndex by rememberSaveable { mutableIntStateOf(0) }
    var answers by remember { mutableStateOf<Map<String, Int>>(emptyMap()) }
    var seconds by rememberSaveable { mutableIntStateOf(0) }
    var finished by rememberSaveable { mutableStateOf(false) }

    fun updateSet(current: Set<String>, value: String, key: String): Set<String> {
        val next = if (current.contains(value)) current - value else current + value
        prefs.edit().putStringSet(key, next).apply()
        return next
    }
    fun finishQuiz() {
        val correct = quiz.count { answers[it.id] == it.answer }
        lastPercent = if (quiz.isEmpty()) 0 else (correct * 100f / quiz.size).roundToInt()
        attempts += 1
        prefs.edit().putInt("attempts", attempts).putInt("last_percent", lastPercent).apply()
        finished = true
        screen = "result"
    }
    fun startQuiz(subjectName: String, count: Int, withTimer: Boolean) {
        val pool = if (subjectName == "All subjects") data.questions else data.questions.filter { it.subject == subjectName }
        quiz = pool.shuffled().take(count.coerceAtMost(pool.size))
        quizSubject = subjectName
        quizIndex = 0
        answers = emptyMap()
        timed = withTimer
        seconds = if (withTimer) 20 * 60 else 0
        finished = false
        screen = "quiz"
    }

    LaunchedEffect(screen, timed, finished) {
        if (screen == "quiz" && timed && !finished && seconds > 0) {
            while (seconds > 0 && screen == "quiz" && !finished) {
                delay(1000)
                seconds -= 1
            }
            if (seconds <= 0 && screen == "quiz" && !finished) finishQuiz()
        }
    }
    BackHandler(enabled = screen.isNotEmpty()) { screen = "" }

    val subject = data.subjects.firstOrNull { it.id == selectedSubjectId }
    val lesson = data.lessons.firstOrNull { it.id == selectedLessonId }
    val remedy = data.remedies.firstOrNull { it.id == selectedRemedyId }
    val repertory = data.repertory.firstOrNull { it.id == selectedRepertoryId }
    val currentTab = Tab.entries.firstOrNull { it.name == tab } ?: Tab.Home
    val title = when (screen) {
        "subject" -> subject?.title ?: "Subject"
        "lesson" -> lesson?.title ?: chapterTitle
        "remedy" -> remedy?.name ?: "Materia Medica"
        "repertory" -> "Kent Repertory"
        "quiz" -> if (timed) "Mock examination" else "Practice"
        "result" -> "Practice result"
        else -> currentTab.label
    }

    Scaffold(
        containerColor = Canvas,
        topBar = {
            CenterAlignedTopAppBar(
                title = { Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(title, fontWeight = FontWeight.Bold, maxLines = 1, overflow = TextOverflow.Ellipsis, fontSize = 17.sp)
                    if (screen.isEmpty()) Text("Curiva · BHMS learning", color = Muted, fontSize = 10.sp)
                } },
                navigationIcon = { if (screen.isNotEmpty()) IconButton(onClick = { screen = "" }) { Icon(Icons.Filled.ArrowBack, contentDescription = "Back") } }
            )
        },
        bottomBar = {
            if (screen.isEmpty()) NavigationBar(containerColor = Color.White) {
                Tab.entries.forEach { item ->
                    NavigationBarItem(
                        selected = currentTab == item, onClick = { tab = item.name; query = "" },
                        icon = { Icon(item.icon, contentDescription = item.label) },
                        label = { Text(item.label, fontSize = 9.sp) }
                    )
                }
            }
        }
    ) { padding ->
        if (data.error != null) {
            Column(Modifier.fillMaxSize().padding(padding).padding(24.dp), verticalArrangement = Arrangement.Center) {
                Text("Offline library unavailable", fontWeight = FontWeight.Bold, fontSize = 20.sp)
                Text(data.error, color = Muted)
            }
        } else {
            Box(Modifier.fillMaxSize().padding(padding)) {
                when (screen) {
                    "subject" -> {
                        if (subject != null) {
                            SubjectScreen(subject, data.lessons.filter { it.subjectId == subject.id }, completed,
                                onLesson = { selectedLessonId = it; chapterTitle = ""; screen = "lesson" },
                                onChapter = { ch ->
                                    selectedLessonId = data.lessons.firstOrNull { it.subjectId == subject.id &&
                                        (it.title.contains(ch.title.take(16), true) || ch.title.contains(it.title.take(16), true)) }?.id ?: ""
                                    chapterTitle = ch.title
                                    screen = "lesson"
                                })
                        } else {
                            Empty("Subject not found", "Return to Learn and open another subject.")
                        }
                    }
                    "lesson" -> LessonScreen(lesson, subject, chapterTitle, lesson?.let { completed.contains(it.id) } ?: false) {
                        lesson?.let { completed = updateSet(completed, it.id, "completed") }
                    }
                    "remedy" -> {
                        if (remedy != null) RemedyScreen(remedy, saved.contains(remedy.id)) {
                            saved = updateSet(saved, remedy.id, "saved")
                        } else Empty("Profile not found", "Return to Library and choose another profile.")
                    }
                    "repertory" -> {
                        if (repertory != null) RepertoryScreen(repertory)
                        else Empty("Chapter not found", "Return to Library and choose another chapter.")
                    }
                    "quiz" -> QuizScreen(quiz, quizIndex, answers, seconds, timed,
                        onAnswer = { q, a -> answers = answers + (q.id to a) },
                        onNext = { if (quizIndex < quiz.lastIndex) quizIndex += 1 else finishQuiz() },
                        onPrevious = { quizIndex = (quizIndex - 1).coerceAtLeast(0) },
                        onSubmit = ::finishQuiz)
                    "result" -> QuizResult(quiz, answers) { screen = ""; tab = Tab.Practice.name }
                    else -> when (currentTab) {
                        Tab.Home -> HomeScreen(learner, data, completed.size, planDone, dailyGoal,
                            onGoal = { dailyGoal = it; prefs.edit().putInt("daily_goal", it).apply() },
                            onTask = { planDone = updateSet(planDone, it, "plan_" + today) },
                            onSubject = { selectedSubjectId = it.id; screen = "subject" },
                            onPractice = { tab = Tab.Practice.name })
                        Tab.Learn -> LearnScreen(data.subjects, query, year,
                            onSearch = { query = it }, onYear = { year = it },
                            onSubject = { selectedSubjectId = it.id; screen = "subject" })
                        Tab.Practice -> PracticeSetup(data.questions, quizSubject, onSubject = { quizSubject = it }, onStart = ::startQuiz)
                        Tab.Cards -> FlashcardScreen(data.cards, flashIndex, flashFilter, flashFlipped, known,
                            onFilter = { flashFilter = it; flashIndex = 0; flashFlipped = false },
                            onFlip = { flashFlipped = !flashFlipped },
                            onNext = { flashIndex += 1; flashFlipped = false },
                            onPrevious = { flashIndex = (flashIndex - 1).coerceAtLeast(0); flashFlipped = false },
                            onKnown = { known = updateSet(known, it.term, "known") })
                        Tab.Library -> LibraryScreen(data, libraryMode, query, saved,
                            onMode = { libraryMode = it; query = "" }, onSearch = { query = it },
                            onRemedy = { selectedRemedyId = it.id; screen = "remedy" },
                            onRepertory = { selectedRepertoryId = it.id; screen = "repertory" })
                        Tab.Progress -> ProgressScreen(learner, completed.size, data.lessons.size, known.size,
                            data.cards.size, attempts, lastPercent, saved.size,
                            onName = { learner = it }, onSave = { prefs.edit().putString("learner", learner).apply() })
                    }
                }
            }
        }
    }
}

@Composable
private fun HomeScreen(
    name: String, data: LearningLibrary, completed: Int, planDone: Set<String>, goal: Int,
    onGoal: (Int) -> Unit, onTask: (String) -> Unit, onSubject: (Subject) -> Unit, onPractice: () -> Unit
) {
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(17.dp), verticalArrangement = Arrangement.spacedBy(13.dp)) {
        item {
            Card(colors = CardDefaults.cardColors(containerColor = Deep), shape = RoundedCornerShape(25.dp)) {
                Column(Modifier.padding(21.dp)) {
                    Text("YOUR STUDY SPACE", color = Color(0xFFB7E8D2), fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    Text("Welcome, " + name + ".", color = Color.White, fontSize = 26.sp, fontWeight = FontWeight.ExtraBold)
                    Text("Learn at your pace. Revise with purpose.", color = Color(0xFFE2F0E9), fontSize = 12.sp)
                    Spacer(Modifier.height(16.dp))
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        Pill("Subjects", data.subjects.size.toString())
                        Pill("MCQs", data.questions.size.toString())
                        Pill("Cards", data.cards.size.toString())
                    }
                }
            }
        }
        item {
            Row(horizontalArrangement = Arrangement.spacedBy(9.dp)) {
                Metric("Lessons completed", completed.toString(), Icons.Filled.CheckCircle, Modifier.weight(1f))
                Metric("Study resources", (data.lessons.size + data.cards.size).toString(), Icons.Filled.MenuBook, Modifier.weight(1f))
            }
        }
        item {
            Heading("Your plan today", "A little focused study adds up")
            Card(colors = CardDefaults.cardColors(containerColor = Color.White), shape = RoundedCornerShape(20.dp)) {
                Column(Modifier.padding(14.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text("Daily goal", fontWeight = FontWeight.Bold, modifier = Modifier.weight(1f))
                        Text(planDone.size.toString() + "/" + planItems.size + " done", color = Muted, fontSize = 10.sp)
                    }
                    Row(Modifier.horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(5.dp)) {
                        listOf(15, 30, 45, 60).forEach {
                            FilterChip(selected = goal == it, onClick = { onGoal(it) }, label = { Text(it.toString() + " min", fontSize = 10.sp) })
                        }
                    }
                    LinearProgressIndicator(progress = { planDone.size.toFloat() / planItems.size }, modifier = Modifier.fillMaxWidth().padding(vertical = 7.dp))
                    planItems.forEach { task ->
                        Row(Modifier.fillMaxWidth().clickable { onTask(task) }.padding(vertical = 3.dp), verticalAlignment = Alignment.CenterVertically) {
                            Checkbox(checked = planDone.contains(task), onCheckedChange = { onTask(task) })
                            Text(task, fontSize = 12.sp, color = if (planDone.contains(task)) Muted else Ink)
                        }
                    }
                }
            }
        }
        item {
            Heading("Continue learning", "BHMS curriculum")
            data.subjects.take(4).forEach { SubjectRow(it) { onSubject(it) } }
        }
        item {
            Card(colors = CardDefaults.cardColors(containerColor = Mint), shape = RoundedCornerShape(18.dp), modifier = Modifier.fillMaxWidth().clickable { onPractice() }) {
                Row(Modifier.padding(17.dp), verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Filled.Quiz, null, tint = Green, modifier = Modifier.size(28.dp))
                    Spacer(Modifier.width(10.dp))
                    Column(Modifier.weight(1f)) {
                        Text("Practice MCQs", fontWeight = FontWeight.Bold, color = Deep)
                        Text("Revision sets and timed mock tests", color = Muted, fontSize = 10.sp)
                    }
                    Icon(Icons.Filled.ChevronRight, null, tint = Green)
                }
            }
        }
        item { Text("Academic learning only. Curiva does not diagnose, prescribe, or replace a qualified clinician.", color = Muted, fontSize = 10.sp) }
    }
}

@Composable
private fun LearnScreen(subjects: List<Subject>, search: String, year: String, onSearch: (String) -> Unit, onYear: (String) -> Unit, onSubject: (Subject) -> Unit) {
    val years = listOf("All years", "1st BHMS", "2nd BHMS", "3rd BHMS", "4th BHMS")
    val filtered = subjects.filter { (year == "All years" || it.year == year) &&
        (search.isBlank() || (it.title + it.summary + it.category + it.highYield.joinToString(" ")).contains(search, true)) }
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(17.dp), verticalArrangement = Arrangement.spacedBy(9.dp)) {
        item {
            Text("Explore your subject list.", color = Muted, fontSize = 12.sp)
            Spacer(Modifier.height(8.dp))
            OutlinedTextField(search, onSearch, modifier = Modifier.fillMaxWidth(), placeholder = { Text("Search subjects and topics") }, leadingIcon = { Icon(Icons.Filled.Search, null) }, singleLine = true, shape = RoundedCornerShape(15.dp))
            Row(Modifier.horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(5.dp)) {
                years.forEach { FilterChip(selected = year == it, onClick = { onYear(it) }, label = { Text(it, fontSize = 10.sp) }) }
            }
            Text(filtered.size.toString() + " subjects", color = Muted, fontSize = 10.sp)
        }
        items(filtered, key = { it.id }) { SubjectRow(it) { onSubject(it) } }
        if (filtered.isEmpty()) item { Empty("No matches", "Try another subject or BHMS year.") }
    }
}

@Composable
private fun SubjectRow(subject: Subject, onClick: () -> Unit) {
    Card(modifier = Modifier.fillMaxWidth().clickable(onClick = onClick), colors = CardDefaults.cardColors(containerColor = Color.White), shape = RoundedCornerShape(16.dp)) {
        Row(Modifier.padding(14.dp), verticalAlignment = Alignment.CenterVertically) {
            Box(Modifier.size(40.dp).background(Mint, CircleShape), contentAlignment = Alignment.Center) { Icon(Icons.Filled.School, null, tint = Green) }
            Spacer(Modifier.width(10.dp))
            Column(Modifier.weight(1f)) {
                Text(subject.title, fontWeight = FontWeight.Bold, fontSize = 12.sp, maxLines = 2, overflow = TextOverflow.Ellipsis)
                Text(subject.year + " · " + subject.category, color = Muted, fontSize = 10.sp)
                Text(subject.chapters.size.toString() + " chapters · " + subject.highYield.size + " revision points", color = Green, fontSize = 10.sp)
            }
            Icon(Icons.Filled.ChevronRight, null, tint = Green)
        }
    }
}

@Composable
private fun SubjectScreen(subject: Subject, lessons: List<Lesson>, completed: Set<String>, onLesson: (String) -> Unit, onChapter: (Chapter) -> Unit) {
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(17.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        item {
            Card(colors = CardDefaults.cardColors(containerColor = Deep), shape = RoundedCornerShape(22.dp)) {
                Column(Modifier.padding(18.dp)) {
                    Text(subject.year + " · " + subject.category.uppercase(), color = Color(0xFFB7E8D2), fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    Text(subject.title, color = Color.White, fontSize = 21.sp, fontWeight = FontWeight.ExtraBold)
                    Text(subject.summary, color = Color(0xFFE2F0E9), fontSize = 12.sp, lineHeight = 18.sp)
                }
            }
        }
        if (subject.examPattern.isNotBlank()) item { Info("Exam pattern", subject.examPattern) }
        item { Heading("Curriculum chapters", subject.chapters.size.toString() + " topics") }
        items(subject.chapters, key = { it.title }) { chapter ->
            Card(modifier = Modifier.fillMaxWidth().clickable { onChapter(chapter) }, colors = CardDefaults.cardColors(containerColor = Color.White), shape = RoundedCornerShape(14.dp)) {
                Row(Modifier.padding(13.dp), verticalAlignment = Alignment.CenterVertically) {
                    Column(Modifier.weight(1f)) { Text(chapter.title, fontWeight = FontWeight.SemiBold, fontSize = 12.sp); Text(chapter.tag, color = Muted, fontSize = 10.sp) }
                    Icon(Icons.Filled.ChevronRight, null, tint = Green)
                }
            }
        }
        if (lessons.isNotEmpty()) {
            item { Heading("Detailed offline lessons", lessons.size.toString() + " study notes") }
            items(lessons, key = { it.id }) { lesson ->
                Card(modifier = Modifier.fillMaxWidth().clickable { onLesson(lesson.id) }, colors = CardDefaults.cardColors(containerColor = Color.White), shape = RoundedCornerShape(14.dp)) {
                    Row(Modifier.padding(13.dp), verticalAlignment = Alignment.CenterVertically) {
                        Column(Modifier.weight(1f)) {
                            Text(lesson.title, fontWeight = FontWeight.SemiBold, fontSize = 12.sp)
                            Text(if (completed.contains(lesson.id)) "Completed" else "Available offline", color = Muted, fontSize = 10.sp)
                        }
                        Icon(Icons.Filled.Book, null, tint = Green)
                    }
                }
            }
        }
        item { Heading("High-yield revision", "Core topics") }
        items(subject.highYield, key = { it }) { Point(it) }
    }
}

@Composable
private fun LessonScreen(lesson: Lesson?, subject: Subject?, chapter: String, done: Boolean, onComplete: () -> Unit) {
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(17.dp), verticalArrangement = Arrangement.spacedBy(11.dp)) {
        item {
            Text(lesson?.year?.ifBlank { subject?.year.orEmpty() } ?: subject?.year.orEmpty(), color = Green, fontWeight = FontWeight.Bold, fontSize = 10.sp)
            Text(lesson?.title ?: chapter, fontWeight = FontWeight.ExtraBold, fontSize = 23.sp, lineHeight = 29.sp)
            Text(lesson?.overview?.ifBlank { subject?.summary.orEmpty() } ?: subject?.summary.orEmpty(), color = Muted, fontSize = 12.sp, lineHeight = 18.sp)
        }
        if (!lesson?.importance.isNullOrBlank()) item { Info("Why it matters", lesson!!.importance) }
        if (lesson == null && subject != null) {
            item { Heading("Revision points", "") }
            items(subject.highYield, key = { it }) { Point(it) }
        }
        lesson?.sections?.forEach { part -> item { Info(part.heading, part.body) } }
        if (!lesson?.points.isNullOrEmpty()) {
            item { Heading("Key takeaways", "") }
            items(lesson!!.points, key = { it }) { Point(it) }
        }
        item {
            Button(onClick = onComplete, enabled = !done, modifier = Modifier.fillMaxWidth()) {
                Icon(Icons.Filled.CheckCircle, null); Spacer(Modifier.width(7.dp)); Text(if (done) "Lesson completed" else "Mark lesson complete")
            }
            Text("Use your prescribed textbooks and current academic guidance to verify this material.", color = Muted, fontSize = 10.sp)
        }
    }
}

@Composable
private fun PracticeSetup(questions: List<Question>, subject: String, onSubject: (String) -> Unit, onStart: (String, Int, Boolean) -> Unit) {
    val subjects = listOf("All subjects") + questions.map { it.subject }.distinct().sorted()
    val available = if (subject == "All subjects") questions else questions.filter { it.subject == subject }
    var count by rememberSaveable { mutableIntStateOf(10) }
    var timed by rememberSaveable { mutableStateOf(false) }
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(17.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
        item {
            Card(colors = CardDefaults.cardColors(containerColor = Deep), shape = RoundedCornerShape(20.dp)) {
                Column(Modifier.padding(18.dp)) {
                    Text("PRACTICE CENTRE", color = Color(0xFFB7E8D2), fontWeight = FontWeight.Bold, fontSize = 10.sp)
                    Text(questions.size.toString() + " offline questions", color = Color.White, fontWeight = FontWeight.ExtraBold, fontSize = 23.sp)
                    Text("Select a subject and test your recall.", color = Color(0xFFE2F0E9), fontSize = 11.sp)
                }
            }
        }
        item {
            Heading("Subject", "")
            Row(Modifier.horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(5.dp)) {
                subjects.forEach { FilterChip(selected = subject == it, onClick = { onSubject(it) }, label = { Text(it, fontSize = 10.sp) }) }
            }
            Text(available.size.toString() + " questions available", color = Muted, fontSize = 10.sp)
        }
        item {
            Heading("Question count", "")
            Row(horizontalArrangement = Arrangement.spacedBy(7.dp)) {
                listOf(10, 20, 40).forEach { FilterChip(selected = count == it, onClick = { count = it }, label = { Text(it.toString()) }) }
            }
        }
        item {
            Card(colors = CardDefaults.cardColors(containerColor = Color.White), shape = RoundedCornerShape(15.dp)) {
                Row(Modifier.fillMaxWidth().clickable { timed = !timed }.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Filled.Timer, null, tint = Green)
                    Column(Modifier.weight(1f).padding(start = 8.dp)) { Text("Timed mock test", fontWeight = FontWeight.Bold); Text("20-minute timer · review after submission", color = Muted, fontSize = 10.sp) }
                    Checkbox(timed, onCheckedChange = { timed = it })
                }
            }
        }
        item {
            Button(onClick = { onStart(subject, count, timed) }, enabled = available.isNotEmpty(), modifier = Modifier.fillMaxWidth()) {
                Icon(Icons.Filled.PlayArrow, null); Spacer(Modifier.width(6.dp)); Text(if (timed) "Start mock test" else "Start practice")
            }
            Text("Answers and explanations are bundled for offline revision.", color = Muted, fontSize = 10.sp)
        }
    }
}

@Composable
private fun QuizScreen(
    questions: List<Question>, index: Int, answers: Map<String, Int>, seconds: Int, timed: Boolean,
    onAnswer: (Question, Int) -> Unit, onNext: () -> Unit, onPrevious: () -> Unit, onSubmit: () -> Unit
) {
    val q = questions.getOrNull(index)
    if (q == null) { Empty("No questions available", "Return to Practice and choose another subject."); return }
    val selected = answers[q.id]
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(17.dp), verticalArrangement = Arrangement.spacedBy(11.dp)) {
        item {
            Row { Text(if (timed) "MOCK TEST" else "PRACTICE MODE", color = Green, fontWeight = FontWeight.Bold, fontSize = 10.sp, modifier = Modifier.weight(1f)); if (timed) Text((seconds / 60).toString() + ":" + (seconds % 60).toString().padStart(2, '0'), fontWeight = FontWeight.Bold) }
            LinearProgressIndicator(progress = { (index + 1f) / questions.size.coerceAtLeast(1) }, modifier = Modifier.fillMaxWidth().padding(vertical = 7.dp))
            Text("Question " + (index + 1) + " of " + questions.size + " · " + q.subject, color = Muted, fontSize = 10.sp)
            Text(q.prompt, fontWeight = FontWeight.Bold, fontSize = 20.sp, lineHeight = 27.sp)
        }
        items(q.options.size) { option ->
            val chosen = selected == option
            val reveal = !timed && selected != null
            Card(
                modifier = Modifier.fillMaxWidth().clickable { if (timed || selected == null) onAnswer(q, option) },
                colors = CardDefaults.cardColors(containerColor = if (chosen) Mint else Color.White),
                border = BorderStroke(if (chosen || (reveal && option == q.answer)) 1.5.dp else 1.dp, if (chosen || (reveal && option == q.answer)) Green else Color(0xFFE1EAE4)),
                shape = RoundedCornerShape(15.dp)
            ) {
                Row(Modifier.padding(14.dp), verticalAlignment = Alignment.CenterVertically) {
                    Text(('A'.code + option).toChar().toString(), color = Green, fontWeight = FontWeight.Bold)
                    Spacer(Modifier.width(11.dp))
                    Text(q.options[option], modifier = Modifier.weight(1f), fontSize = 12.sp)
                    if (reveal && option == q.answer) Icon(Icons.Filled.CheckCircle, null, tint = Green)
                }
            }
        }
        if (!timed && selected != null) item { Info(if (selected == q.answer) "Correct" else "Review this", q.explanation) }
        item {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedButton(onClick = onPrevious, enabled = index > 0, modifier = Modifier.weight(1f)) { Text("Previous") }
                Button(onClick = if (index == questions.lastIndex) onSubmit else onNext, enabled = timed || selected != null, modifier = Modifier.weight(1f)) {
                    Text(if (index == questions.lastIndex) "Submit" else "Next")
                }
            }
            TextButton(onClick = onSubmit, modifier = Modifier.fillMaxWidth()) { Text("Finish test") }
        }
    }
}

@Composable
private fun QuizResult(questions: List<Question>, answers: Map<String, Int>, onDone: () -> Unit) {
    val score = questions.count { answers[it.id] == it.answer }
    val percent = if (questions.isEmpty()) 0 else score * 100 / questions.size
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(17.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        item {
            Card(colors = CardDefaults.cardColors(containerColor = Deep), shape = RoundedCornerShape(22.dp)) {
                Column(Modifier.fillMaxWidth().padding(22.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(Icons.Filled.EmojiEvents, null, tint = Color(0xFFF3D28B), modifier = Modifier.size(36.dp))
                    Text("Practice complete", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 22.sp)
                    Text(score.toString() + " / " + questions.size, color = Color.White, fontWeight = FontWeight.ExtraBold, fontSize = 35.sp)
                    Text(percent.toString() + "% accuracy", color = Color(0xFFB7E8D2))
                }
            }
            Button(onClick = onDone, modifier = Modifier.fillMaxWidth()) { Text("Back to Practice") }
            Heading("Review answers", "Correct answer and explanation")
        }
        items(questions, key = { it.id }) { q ->
            val yours = answers[q.id]
            Card(colors = CardDefaults.cardColors(containerColor = Color.White), shape = RoundedCornerShape(14.dp)) {
                Column(Modifier.padding(13.dp)) {
                    Text(q.subject, color = Green, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    Text(q.prompt, fontWeight = FontWeight.Bold, fontSize = 12.sp)
                    Text("Your answer: " + (yours?.let { q.options.getOrNull(it) } ?: "Not attempted"), color = Muted, fontSize = 10.sp)
                    Text("Correct: " + q.options.getOrNull(q.answer).orEmpty(), color = Green, fontSize = 10.sp, fontWeight = FontWeight.Bold)
                    Text(q.explanation, color = Muted, fontSize = 11.sp, lineHeight = 17.sp)
                }
            }
        }
    }
}

@Composable
private fun FlashcardScreen(
    cards: List<Flashcard>, index: Int, filter: String, flipped: Boolean, known: Set<String>,
    onFilter: (String) -> Unit, onFlip: () -> Unit, onNext: () -> Unit,
    onPrevious: () -> Unit, onKnown: (Flashcard) -> Unit
) {
    val filters = listOf("All types") + cards.map { it.type }.distinct()
    val values = cards.filter { filter == "All types" || it.type == filter }
    val card = values.getOrNull(index.coerceAtMost((values.size - 1).coerceAtLeast(0)))
    Column(Modifier.fillMaxSize().padding(16.dp), verticalArrangement = Arrangement.spacedBy(11.dp)) {
        Text("Active recall for quick revision", color = Muted, fontSize = 12.sp)
        Row(Modifier.horizontalScroll(rememberScrollState()), horizontalArrangement = Arrangement.spacedBy(5.dp)) {
            filters.forEach { FilterChip(selected = filter == it, onClick = { onFilter(it) }, label = { Text(it, fontSize = 9.sp) }) }
        }
        if (card == null) Empty("No cards in this category", "Try another flashcard type.")
        else {
            Text((index + 1).toString() + " of " + values.size + " cards", color = Muted, fontSize = 10.sp)
            Card(Modifier.weight(1f).fillMaxWidth().clickable { onFlip() }, colors = CardDefaults.cardColors(containerColor = if (flipped) Deep else Color.White), shape = RoundedCornerShape(24.dp)) {
                Column(Modifier.fillMaxSize().padding(22.dp), verticalArrangement = Arrangement.Center) {
                    Text(if (flipped) "DEFINITION & REVISION" else card.type.uppercase(), color = if (flipped) Color(0xFFB7E8D2) else Green, fontWeight = FontWeight.Bold, fontSize = 10.sp)
                    Spacer(Modifier.height(17.dp))
                    Text(if (flipped) card.definition else card.term, color = if (flipped) Color.White else Ink, fontWeight = FontWeight.ExtraBold, fontSize = if (flipped) 18.sp else 26.sp, lineHeight = 29.sp)
                    if (flipped) Text(card.significance, color = Color(0xFFE2F0E9), fontSize = 12.sp, lineHeight = 18.sp, modifier = Modifier.padding(top = 14.dp))
                    else Text("Tap to reveal", color = Muted, fontSize = 11.sp, modifier = Modifier.padding(top = 12.dp))
                }
            }
            Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                OutlinedButton(onClick = onPrevious, enabled = index > 0, modifier = Modifier.weight(1f)) { Text("Previous") }
                Button(onClick = onFlip, modifier = Modifier.weight(1f)) { Text(if (flipped) "Hide" else "Reveal") }
                Button(onClick = onNext, enabled = index < values.lastIndex, modifier = Modifier.weight(1f)) { Text("Next") }
            }
            OutlinedButton(onClick = { onKnown(card) }, modifier = Modifier.fillMaxWidth()) { Text(if (known.contains(card.term)) "Marked as known" else "Mark as known") }
        }
    }
}

@Composable
private fun LibraryScreen(
    data: LearningLibrary, mode: String, search: String, saved: Set<String>,
    onMode: (String) -> Unit, onSearch: (String) -> Unit, onRemedy: (Remedy) -> Unit, onRepertory: (RepertoryChapter) -> Unit
) {
    val remedies = data.remedies.filter { (it.name + it.commonName + it.family + it.keynotes.joinToString()).contains(search, true) }
    val chapters = data.repertory.filter { (it.name + it.description).contains(search, true) }
    Column(Modifier.fillMaxSize().padding(horizontal = 16.dp)) {
        Spacer(Modifier.height(6.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
            listOf("Materia Medica", "Kent Repertory").forEach { FilterChip(selected = mode == it, onClick = { onMode(it); onSearch("") }, label = { Text(it, fontSize = 10.sp) }) }
        }
        OutlinedTextField(search, onSearch, modifier = Modifier.fillMaxWidth(), placeholder = { Text("Search library") }, leadingIcon = { Icon(Icons.Filled.Search, null) }, singleLine = true, shape = RoundedCornerShape(14.dp))
        if (mode == "Materia Medica") {
            LazyColumn(contentPadding = PaddingValues(vertical = 9.dp), verticalArrangement = Arrangement.spacedBy(7.dp)) {
                item { Text(remedies.size.toString() + " remedy profiles · " + saved.size + " saved", color = Muted, fontSize = 10.sp) }
                items(remedies, key = { it.id }) { item ->
                    Card(Modifier.fillMaxWidth().clickable { onRemedy(item) }, colors = CardDefaults.cardColors(containerColor = Color.White), shape = RoundedCornerShape(14.dp)) {
                        Row(Modifier.padding(13.dp), verticalAlignment = Alignment.CenterVertically) {
                            Column(Modifier.weight(1f)) {
                                Text(item.name, fontWeight = FontWeight.Bold, fontSize = 12.sp)
                                Text(item.commonName + " · " + item.family, color = Muted, fontSize = 10.sp)
                                Text(item.keynotes.take(2).joinToString(" · "), color = Muted, fontSize = 10.sp, maxLines = 2, overflow = TextOverflow.Ellipsis)
                            }
                            Icon(if (saved.contains(item.id)) Icons.Filled.Bookmarks else Icons.Filled.ChevronRight, null, tint = Green)
                        }
                    }
                }
            }
        } else {
            LazyColumn(contentPadding = PaddingValues(vertical = 9.dp), verticalArrangement = Arrangement.spacedBy(7.dp)) {
                item { Text("Study index only · Not a diagnostic or prescribing tool", color = Muted, fontSize = 10.sp) }
                items(chapters, key = { it.id }) { item ->
                    Card(Modifier.fillMaxWidth().clickable { onRepertory(item) }, colors = CardDefaults.cardColors(containerColor = Color.White), shape = RoundedCornerShape(14.dp)) {
                        Column(Modifier.padding(13.dp)) {
                            Text(item.name, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                            Text(item.description, color = Muted, fontSize = 10.sp)
                            Text(item.rubrics.size.toString() + " rubrics", color = Green, fontSize = 10.sp)
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun RemedyScreen(remedy: Remedy, saved: Boolean, onSave: () -> Unit) {
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(17.dp), verticalArrangement = Arrangement.spacedBy(10.dp)) {
        item {
            Text(remedy.commonName + " · " + remedy.family, color = Green, fontWeight = FontWeight.Bold, fontSize = 10.sp)
            Text(remedy.name, fontWeight = FontWeight.ExtraBold, fontSize = 23.sp)
            Text("Classical Materia Medica material for academic study. These historical descriptions do not establish treatment effectiveness.", color = Muted, fontSize = 11.sp)
            OutlinedButton(onClick = onSave, modifier = Modifier.fillMaxWidth()) { Icon(Icons.Filled.Bookmarks, null); Spacer(Modifier.width(6.dp)); Text(if (saved) "Remove saved profile" else "Save profile") }
        }
        item { BulletCard("Keynotes", remedy.keynotes) }
        item { BulletCard("Mind", remedy.mind) }
        item { BulletCard("Physical description", remedy.physical) }
        item { BulletCard("Reported modalities · Better", remedy.better) }
        item { BulletCard("Reported modalities · Worse", remedy.worse) }
        item { Text("Do not use this profile to self-diagnose, select treatment, or delay medical care.", color = Muted, fontSize = 10.sp) }
    }
}

@Composable
private fun RepertoryScreen(chapter: RepertoryChapter) {
    var query by rememberSaveable(chapter.id) { mutableStateOf("") }
    val rubrics = chapter.rubrics.filter { (it.symptom + it.category + it.remedies.joinToString()).contains(query, true) }
    Column(Modifier.fillMaxSize().padding(horizontal = 16.dp)) {
        Text(chapter.description, color = Muted, fontSize = 11.sp)
        OutlinedTextField(query, { query = it }, modifier = Modifier.fillMaxWidth(), placeholder = { Text("Search rubrics") }, leadingIcon = { Icon(Icons.Filled.Search, null) }, singleLine = true, shape = RoundedCornerShape(14.dp))
        Text(rubrics.size.toString() + " study rubrics", color = Muted, fontSize = 10.sp, modifier = Modifier.padding(vertical = 7.dp))
        LazyColumn(verticalArrangement = Arrangement.spacedBy(7.dp), contentPadding = PaddingValues(bottom = 18.dp)) {
            items(rubrics) { rubric ->
                Card(colors = CardDefaults.cardColors(containerColor = Color.White), shape = RoundedCornerShape(13.dp)) {
                    Column(Modifier.padding(12.dp)) {
                        if (rubric.category.isNotBlank()) Text(rubric.category.uppercase(), color = Green, fontSize = 9.sp, fontWeight = FontWeight.Bold)
                        Text(rubric.symptom, fontWeight = FontWeight.SemiBold, fontSize = 12.sp)
                        if (rubric.remedies.isNotEmpty()) Text("Indexed remedies: " + rubric.remedies.joinToString(", "), color = Muted, fontSize = 10.sp)
                        if (rubric.notes.isNotBlank()) Text(rubric.notes, color = Muted, fontSize = 10.sp)
                    }
                }
            }
        }
    }
}

@Composable
private fun ProgressScreen(
    name: String, completed: Int, lessons: Int, known: Int, cards: Int,
    attempts: Int, lastPercent: Int, saved: Int, onName: (String) -> Unit, onSave: () -> Unit
) {
    LazyColumn(Modifier.fillMaxSize(), contentPadding = PaddingValues(17.dp), verticalArrangement = Arrangement.spacedBy(11.dp)) {
        item {
            Text("Your learning profile", color = Muted, fontSize = 12.sp)
            OutlinedTextField(name, onName, modifier = Modifier.fillMaxWidth(), label = { Text("Display name") }, singleLine = true)
            OutlinedButton(onClick = onSave, modifier = Modifier.fillMaxWidth()) { Text("Save profile") }
        }
        item { Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Metric("Lessons", completed.toString() + " / " + lessons, Icons.Filled.MenuBook, Modifier.weight(1f))
            Metric("Cards known", known.toString() + " / " + cards, Icons.Filled.Style, Modifier.weight(1f))
        } }
        item { Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Metric("Quiz attempts", attempts.toString(), Icons.Filled.Quiz, Modifier.weight(1f))
            Metric("Last score", lastPercent.toString() + "%", Icons.Filled.TrendingUp, Modifier.weight(1f))
        } }
        item { Info("Saved library", saved.toString() + " Materia Medica profiles saved on this device.") }
        item { Info("Offline by design", "Lesson progress, saved profiles, flashcard status, and your study plan are stored locally on this device. They are not uploaded to Curiva.") }
        item { Info("Academic-use notice", "Curiva is a medical learning app. It does not provide diagnosis, clinical decision support, prescriptions, or emergency care. Follow qualified supervision and current evidence-based guidance for clinical decisions.") }
    }
}

@Composable
private fun Heading(title: String, subtitle: String) {
    Column {
        Text(title, color = Ink, fontWeight = FontWeight.ExtraBold, fontSize = 16.sp)
        if (subtitle.isNotBlank()) Text(subtitle, color = Muted, fontSize = 10.sp)
    }
}
@Composable
private fun Metric(label: String, value: String, icon: ImageVector, modifier: Modifier = Modifier) {
    Card(modifier, colors = CardDefaults.cardColors(containerColor = Color.White), shape = RoundedCornerShape(16.dp)) {
        Column(Modifier.padding(12.dp)) {
            Icon(icon, null, tint = Green, modifier = Modifier.size(19.dp))
            Text(value, color = Ink, fontWeight = FontWeight.ExtraBold, fontSize = 18.sp)
            Text(label, color = Muted, fontSize = 9.sp)
        }
    }
}
@Composable
private fun Pill(label: String, value: String) {
    Surface(color = Color(0xFF2F6658), shape = RoundedCornerShape(11.dp)) {
        Column(Modifier.padding(horizontal = 10.dp, vertical = 7.dp)) {
            Text(value, color = Color.White, fontWeight = FontWeight.ExtraBold, fontSize = 14.sp)
            Text(label, color = Color(0xFFD8E9E1), fontSize = 9.sp)
        }
    }
}
@Composable
private fun Info(title: String, body: String) {
    Card(colors = CardDefaults.cardColors(containerColor = Color.White), shape = RoundedCornerShape(15.dp), modifier = Modifier.fillMaxWidth()) {
        Column(Modifier.padding(14.dp)) {
            Text(title, fontWeight = FontWeight.Bold, fontSize = 12.sp)
            Text(body, color = Muted, fontSize = 11.sp, lineHeight = 17.sp, modifier = Modifier.padding(top = 5.dp))
        }
    }
}
@Composable
private fun Point(value: String) {
    Row(Modifier.fillMaxWidth().padding(vertical = 3.dp), verticalAlignment = Alignment.Top) {
        Text("•", color = Green, fontWeight = FontWeight.Bold)
        Spacer(Modifier.width(8.dp))
        Text(value, color = Ink, fontSize = 11.sp, lineHeight = 17.sp)
    }
}
@Composable
private fun BulletCard(title: String, values: List<String>) {
    Card(colors = CardDefaults.cardColors(containerColor = Color.White), shape = RoundedCornerShape(15.dp), modifier = Modifier.fillMaxWidth()) {
        Column(Modifier.padding(14.dp)) {
            Text(title, fontWeight = FontWeight.Bold, fontSize = 12.sp)
            if (values.isEmpty()) Text("No additional notes in this record.", color = Muted, fontSize = 10.sp)
            else values.forEach { Point(it) }
        }
    }
}
@Composable
private fun Empty(title: String, subtitle: String) {
    Column(Modifier.fillMaxWidth().padding(25.dp), horizontalAlignment = Alignment.CenterHorizontally) {
        Icon(Icons.Filled.Book, null, tint = Green, modifier = Modifier.size(34.dp))
        Text(title, fontWeight = FontWeight.Bold)
        Text(subtitle, color = Muted, fontSize = 11.sp)
    }
}
