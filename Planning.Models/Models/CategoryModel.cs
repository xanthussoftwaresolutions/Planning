using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Planning.Models
{
    public class CategoryModel
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int IsDataExist { get; set; }

    }
    public class BaseCategoryModel
    {
        public int BaseCategoryId { get; set; }
        public string BaseCategoryName { get; set; }

    }
}