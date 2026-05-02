
const data = {
  id: "root",
  name: "Curiva Research",
  type: "root",
  children: [
    {
      id: "digestive",
      children: [
        { id: "acidity", articleId: "/conditions/acidity", children: [{id: "argentum-nitricum", articleId: "/read/argentum-nitricum-profile"}] }
        // ... I'll just check the file content instead
      ]
    }
  ]
};
// I can't easily parse the TS file with JS without a parser.
// I'll just use grep to find nodes WITHOUT articleId.
