import React, { useState, useEffect, useRef } from "react";
import { categories } from "../data/mockData";
import {
  Search,
  LayoutGrid,
  Calendar,
  User,
  ArrowRight,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Tag,
  Filter,
  Star,
  X,
  Clock,
} from "lucide-react";
import * as IconsList from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BlogPost } from "../types";
import { fetchPosts } from "../services/api";
import { useSearchParams, useNavigate } from "react-router-dom";

interface BlogGridProps {
  onSelectPost: (post: BlogPost) => void;
}

const ITEMS_PER_PAGE = 9;

const BlogGrid: React.FC<BlogGridProps> = ({ onSelectPost }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedCategory = searchParams.get("category") || "All";
  const selectedTag = searchParams.get("tag") || null;
  const selectedDateRange = searchParams.get("dateRange") || "all";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
    {},
  );
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch all posts once to count categories
  useEffect(() => {
    const fetchAllCounts = async () => {
      try {
        const data = await fetchPosts();
        const counts: Record<string, number> = { All: data.length };
        data.forEach((post) => {
          counts[post.category] = (counts[post.category] || 0) + 1;
        });
        setCategoryCounts(counts);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };
    fetchAllCounts();
  }, []);

  const loadPosts = async (explicitSearch?: string) => {
    setIsLoading(true);
    try {
      const query = explicitSearch !== undefined ? explicitSearch : searchQuery;
      const data = await fetchPosts(
        selectedCategory === "All" ? undefined : selectedCategory,
        query,
        selectedTag || undefined,
        selectedDateRange === "all" ? undefined : selectedDateRange
      );
      setPosts(data);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [selectedCategory, selectedTag, selectedDateRange]);

  const handleSearchTrigger = (e?: React.FormEvent) => {
    e?.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery) {
      newParams.set("search", searchQuery);
    } else {
      newParams.delete("search");
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
    loadPosts();
  };

  const handleDateRangeChange = (range: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (range === "all") {
      newParams.delete("dateRange");
    } else {
      newParams.set("dateRange", range);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handleCategoryChange = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (category === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", category);
    }
    newParams.delete("tag");
    newParams.set("page", "1");
    setSearchParams(newParams);
    setSearchQuery(""); // Reset search when switching categories

    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollHandler = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleTagClick = (tag: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (tag) {
      newParams.set("tag", tag);
    } else {
      newParams.delete("tag");
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const currentPosts = posts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div
      id="blog-grid"
      ref={gridRef}
      className="transition-colors duration-300"
    >
      <div className="w-full">
        {/* Filters and Search */}
        <div className="flex flex-col gap-8 mb-12">
          {selectedCategory !== "All" && !selectedTag && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-bg-primary p-6 rounded-2xl border border-border"
            >
              <div className="flex items-center gap-3 mb-2">
                {(() => {
                  const cat = categories.find(
                    (c) => c.name === selectedCategory,
                  );
                  const Icon = cat ? (IconsList as any)[cat.icon] : null;
                  return Icon ? (
                    <Icon className="w-6 h-6 text-primary" />
                  ) : null;
                })()}
                <h3 className="text-2xl font-display font-bold text-primary">
                  {selectedCategory}
                </h3>
              </div>
              <p className="text-text-secondary">
                {
                  categories.find((c) => c.name === selectedCategory)
                    ?.description
                }
              </p>
            </motion.div>
          )}

          <div className="bg-bg-primary p-4 rounded-2xl border border-border shadow-sm">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="w-full lg:w-auto flex items-center gap-2 relative">
                <button
                  onClick={() => scrollHandler("left")}
                  className="p-2 hover:bg-bg-secondary rounded-full lg:hidden block shrink-0"
                  aria-label="Scroll categories left"
                >
                  <ChevronLeft className="w-5 h-5 text-text-secondary" />
                </button>

                <div
                  ref={scrollRef}
                  className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-1 -mb-1 px-1 snap-x"
                  role="tablist"
                  aria-label="Blog categories"
                >
                  <div className="flex gap-3 flex-nowrap min-w-max">
                    <button
                      onClick={() => handleCategoryChange("All")}
                      role="tab"
                      aria-selected={selectedCategory === "All" && !selectedTag}
                      aria-label={`Show all posts. ${categoryCounts["All"] || 0} articles available.`}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 snap-start border-none ${
                        selectedCategory === "All" && !selectedTag
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "bg-bg-secondary hover:bg-border text-text-secondary"
                      }`}
                    >
                      <LayoutGrid className="w-4 h-4" />
                      All Reference Units
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-black ${selectedCategory === "All" ? "bg-white/20" : "bg-primary/10 text-primary"}`}
                      >
                        {categoryCounts["All"] || 0}
                      </span>
                    </button>
                    {categories.map((cat) => {
                      const Icon = (IconsList as any)[cat.icon];
                      const count = categoryCounts[cat.name] || 0;
                      const isActive =
                        selectedCategory === cat.name && !selectedTag;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryChange(cat.name)}
                          role="tab"
                          aria-selected={isActive}
                          aria-label={`Show ${cat.name} articles. ${count} articles available.`}
                          className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 snap-start border-none ${
                            isActive
                              ? "bg-primary text-white shadow-md shadow-primary/20"
                              : "bg-bg-secondary hover:bg-border text-text-secondary"
                          }`}
                        >
                          {Icon && <Icon className="w-4 h-4" />}
                          {cat.name}
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-black ${isActive ? "bg-white/20" : "bg-primary/10 text-primary"}`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {selectedTag && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold shadow-md shrink-0 snap-start">
                      <Tag className="w-3 h-3" />#{selectedTag}
                      <button
                        onClick={() => handleTagClick(null)}
                        className="hover:text-white/80"
                        aria-label="Clear tag filter"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => scrollHandler("right")}
                  className="p-2 hover:bg-bg-secondary rounded-full lg:hidden block shrink-0"
                  aria-label="Scroll categories right"
                >
                  <ChevronRight className="w-5 h-5 text-text-secondary" />
                </button>
              </div>

              <form
                onSubmit={handleSearchTrigger}
                className="relative w-full lg:w-96 flex gap-2"
              >
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search titles and content..."
                    aria-label="Search articles"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-bg-secondary border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm dark:text-white"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
                </div>
                <button
                  type="button"
                  onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
                  className={`p-3 rounded-xl border transition-all ${isAdvancedFiltersOpen ? 'bg-primary/10 border-primary text-primary' : 'bg-bg-secondary border-transparent text-text-secondary hover:border-primary/20'}`}
                  title="Advanced Filters"
                >
                  <Filter className="w-5 h-5" />
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                  Search
                </button>
              </form>
            </div>

            <AnimatePresence>
              {isAdvancedFiltersOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 mt-6 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-text-tertiary flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Publication Date
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { id: 'all', name: 'Any Time' },
                          { id: 'recent', name: 'Past Month' },
                          { id: 'last-6-months', name: 'Past 6 Months' },
                          { id: 'last-year', name: 'Past Year' }
                        ].map((range) => (
                          <button
                            key={range.id}
                            onClick={() => handleDateRangeChange(range.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                              selectedDateRange === range.id
                                ? "bg-primary text-white border-primary shadow-sm"
                                : "bg-bg-secondary text-text-secondary border-transparent hover:border-primary/20"
                            }`}
                          >
                            {range.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-text-tertiary flex items-center gap-2">
                        <Star className="w-4 h-4" /> Quick Filters
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['Repertory', 'Organon', 'Pharmacy', 'Clinical'].map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                              selectedTag === tag
                                ? "bg-primary text-white border-primary shadow-sm"
                                : "bg-bg-secondary text-text-secondary border-transparent hover:border-primary/20"
                            }`}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div id="blog-posts-grid">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <AnimatePresence mode="popLayout" initial={false}>
                {currentPosts.flatMap((post, idx) => {
                  const items = [];
                  
                  if (idx === 4) {
                    items.push(
                      <motion.div
                        key={`cta-research-db-${post.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="col-span-full md:col-span-2 lg:col-span-3 bg-gradient-to-r from-primary to-primary-dark rounded-[2rem] p-8 md:p-10 text-white shadow-xl shadow-primary/20 flex flex-col md:flex-row items-center justify-between gap-8 mb-4 mt-4 relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="relative z-10 flex-1 text-center md:text-left">
                          <h3 className="text-2xl md:text-3xl font-display font-black mb-2">Explore Anatomical Patterns</h3>
                          <p className="text-white/80 text-lg">Use our interactive Symptom Map to visualize traditional clinical patterns and research-indicated support.</p>
                        </div>
                        <div className="relative z-10 shrink-0 w-full md:w-auto">
                          <button 
                            className="w-full md:w-auto px-8 py-4 bg-white text-primary font-black uppercase text-sm tracking-widest rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = '/topics';
                            }}
                          >
                            Explore Database
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  }
                  
                  items.push(
                    <motion.article
                      layout
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      whileHover={{ y: -5, rotateX: 2, rotateY: 2, scale: 1.02 }}
                      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                      className="group bg-bg-primary rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer h-full flex flex-col relative"
                      onClick={() => onSelectPost(post)}
                    >
                      <div className="relative aspect-video overflow-hidden shrink-0 bg-bg-secondary">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-text-primary text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm border border-black/5 dark:border-white/5">
                            {post.category}
                          </span>
                          {idx === 0 && selectedCategory === 'All' && !selectedTag && (
                             <span className="px-3 py-1.5 bg-primary/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                               New
                             </span>
                          )}
                        </div>
                      </div>
                      <div className="p-6 md:p-8 flex flex-col flex-1">
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </div>
                          <div className="flex items-center gap-1.5 text-sm font-medium text-text-secondary bg-bg-secondary px-2.5 py-1 rounded-md">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readingTime || "5 min read"}
                          </div>
                        </div>
                        <h3 className="text-xl md:text-2xl font-display font-extrabold text-text-primary mb-3 group-hover:text-primary transition-colors leading-snug line-clamp-2 min-h-[3.5rem]">
                          {post.title}
                        </h3>
                        <p className="text-text-secondary text-[15px] mb-6 flex-1 opacity-90 leading-relaxed line-clamp-3">
                          {post.quickSummary?.[0] || post.excerpt}
                        </p>
                        <div className="mt-auto">
                          <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTagClick(tag);
                                }}
                                className="text-[11px] bg-bg-secondary text-text-secondary px-3 py-1.5 rounded-lg font-bold hover:bg-primary hover:text-white transition-all shadow-sm"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <button
                            className="w-full py-3.5 bg-bg-secondary text-primary font-black text-xs uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 border border-border group-hover:shadow-md"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectPost(post);
                            }}
                          >
                            Read Full Story
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  );
                  
                  return items;
                })}
              </AnimatePresence>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-[2.5rem] p-8 md:p-12 mb-16 max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-center text-center lg:text-left shadow-lg shadow-bg-primary/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex-1 relative z-10">
                <h3 className="text-3xl lg:text-4xl font-display font-bold text-text-primary mb-4 leading-tight">
                  Get Wellness Wisdom Weekly
                </h3>
                <p className="text-text-secondary text-lg">
                  Join 10,000+ readers getting the latest natural healing
                  insights delivered directly.
                </p>
              </div>
              <div className="w-full lg:w-96 shrink-0 relative z-10">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-5 py-4 bg-bg-primary border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none w-full shadow-sm"
                    required
                  />
                  <button className="px-6 py-4 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-primary/20 w-full sm:w-auto">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center gap-8 py-12 border-t border-border/50">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-3xl bg-bg-secondary p-8 rounded-[2rem] border border-border shadow-sm">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-4 rounded-2xl bg-bg-primary border border-border text-text-secondary disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary hover:text-primary transition-all flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em]"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Prev
                    </button>
  
                    <div className="flex items-center gap-1.5 mx-2">
                      {getPageNumbers().map((page, index) => (
                        <React.Fragment key={index}>
                          {page === "..." ? (
                            <span className="w-10 h-10 flex items-center justify-center text-text-secondary font-black">
                              {page}
                            </span>
                          ) : (
                            <button
                              onClick={() => handlePageChange(page as number)}
                              className={`w-12 h-12 rounded-2xl font-black text-xs transition-all ${
                                currentPage === page
                                  ? "bg-primary text-white shadow-xl shadow-primary/20 scale-110 z-10"
                                  : "bg-bg-primary text-text-secondary border border-border hover:border-primary hover:text-primary"
                              }`}
                            >
                              {page}
                            </button>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
  
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-4 rounded-2xl bg-bg-primary border border-border text-text-secondary disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary hover:text-primary transition-all flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em]"
                      aria-label="Next page"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex flex-col items-center sm:items-end gap-1 sm:ml-auto">
                    <div className="text-[10px] uppercase font-black tracking-[0.2em] text-text-primary">
                      Step {currentPage} of {totalPages}
                    </div>
                    <div className="text-[10px] uppercase font-bold tracking-[0.1em] text-text-secondary opacity-40">
                      Exploring {posts.length} Publications
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!isLoading && posts.length === 0 && (
          <div className="text-center py-24 bg-bg-secondary/30 rounded-[3rem] border border-dashed border-border mb-20 animate-in fade-in zoom-in duration-500">
            <div className="bg-bg-primary p-12 rounded-3xl shadow-xl inline-block border border-border relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border-4 border-bg-primary">
                <Search className="w-10 h-10 text-primary opacity-50" />
              </div>
              <h3 className="text-2xl font-display font-bold text-text-primary mb-3 mt-4">
                We couldn't find that
              </h3>
              <p className="text-text-secondary max-w-sm mx-auto mb-8 leading-relaxed">
                Try searching with different keywords or explore our popular
                categories below.
              </p>
              <button
                onClick={() => {
                  setSearchParams({});
                  setSearchQuery("");
                  loadPosts("");
                }}
                className="px-8 py-3.5 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-lg shadow-primary/20"
              >
                Reset Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogGrid;
