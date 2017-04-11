using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Planning.Models;
using Infragistics.Web.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using Planning.Models;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using System.IO;
using System.Reflection;
using System.Web.Routing;

namespace Planning.Portal.Controllers
{
    public class PlanningController : Controller
    {
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult DataEntry(string categoryId)
        {
            List<PlanningDataInputModel> objListPlanningDataInputModel = new List<PlanningDataInputModel>();
            try
            {
                string fromDate = "";
                string toDate = "";
                if (!string.IsNullOrEmpty(categoryId))
                {
                    if ((!string.IsNullOrEmpty(fromDate)) && (!string.IsNullOrEmpty(toDate)))
                    {
                        objListPlanningDataInputModel = GetWeekWiseGrid(categoryId.ToString().Trim(), fromDate.ToString().Trim(), toDate.ToString().Trim());
                    }
                    else
                    {
                        objListPlanningDataInputModel = GetWeekWiseGridByCategory(categoryId.ToString().Trim());
                    }
                }
                else
                {
                    PlanningDataInputModel objPlanningDataInputModel = new Planning.Models.PlanningDataInputModel();
                    objListPlanningDataInputModel.Add(objPlanningDataInputModel);

                }
            }
            catch (Exception ex)
            {
                PlanningDataInputModel objPlanningDataInputModel = new Planning.Models.PlanningDataInputModel();
                objListPlanningDataInputModel.Add(objPlanningDataInputModel);
                TempData["Error"] = " Request Processing has encountered an unknown errongr";
            }
            var model = objListPlanningDataInputModel.AsQueryable();
            return View("~/Views/Planning/DataEntry.cshtml", model);
        }

        [ActionName("DataEntry")]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult DataEntry(FormCollection frm)
        {
            List<PlanningDataInputModel> objListPlanningDataInputModel = new List<PlanningDataInputModel>();
            try
            {
                string subcategoryId = "";
                string baseCategoryId = "";
                string fromDate = "";
                string toDate = "";
                //if (Request.Form["hdnitem_SubCategory"] != null && Request.Form["hdnitem_isProcess"] != null)
                //{
                //    subcategoryId = Request.Form["hdnitem_SubCategory"];
                //}
                if (Request.Form["hdnitem_SubCategory"] != null)
                {
                    subcategoryId = Request.Form["hdnitem_SubCategory"];
                    TempData["subCategoryId"] = subcategoryId;

                }
                if (Request.Form["hdnitem_BaseCategory"] != null)
                {
                    baseCategoryId = Request.Form["hdnitem_BaseCategory"];
                    TempData["baseCategoryId"] = baseCategoryId;

                }
                if (Request.Form["hdnfromDate"] != null)
                {
                    fromDate = Request.Form["hdnfromDate"];
                    TempData["fromDate"] = fromDate;
                }
                if (Request.Form["hdntoDate"] != null)
                {
                    toDate = Request.Form["hdntoDate"];
                    TempData["toDate"] = toDate;
                }
                if (!string.IsNullOrEmpty(subcategoryId))
                {
                    if ((!string.IsNullOrEmpty(fromDate)) && (!string.IsNullOrEmpty(toDate)))
                    {
                        objListPlanningDataInputModel = GetWeekWiseGrid(subcategoryId.ToString().Trim(), fromDate.ToString().Trim(), toDate.ToString().Trim());
                    }
                    else
                    {
                        objListPlanningDataInputModel = GetWeekWiseGridByCategory(subcategoryId.ToString().Trim());
                        //objListPlanningDataInputModel = GetWeekWiseGridByCategory(categoryId);

                    }
                }
                else
                {
                    PlanningDataInputModel objPlanningDataInputModel = new Planning.Models.PlanningDataInputModel();
                    objListPlanningDataInputModel.Add(objPlanningDataInputModel);
                }
            }
            catch (Exception ex)
            {
                PlanningDataInputModel objPlanningDataInputModel = new Planning.Models.PlanningDataInputModel();
                objListPlanningDataInputModel.Add(objPlanningDataInputModel);
                TempData["Error"] = "Request processing has encountered an unknown error";
            }

            var model = objListPlanningDataInputModel.AsQueryable();
            return View("~/Views/Planning/DataEntry.cshtml", model);
        }



        public List<PlanningDataInputModel> GetWeekWiseGrid(string category, string fromDate, string toDate)
        {
            List<PlanningDataInputModel> objListPlanningDataInputModel = null;
            try
            {
                SqlParameter[] sParams = new SqlParameter[3]; // Parameter count
                sParams[0] = new SqlParameter();
                sParams[0].SqlDbType = SqlDbType.VarChar;
                sParams[0].ParameterName = "@CategoryID";
                sParams[0].Value = category;

                sParams[1] = new SqlParameter();
                sParams[1].SqlDbType = SqlDbType.Date;
                sParams[1].ParameterName = "@startDate";
                sParams[1].Value = fromDate;

                sParams[2] = new SqlParameter();
                sParams[2].SqlDbType = SqlDbType.Date;
                sParams[2].ParameterName = "@enddate";
                sParams[2].Value = toDate;
                DataSet dsPlanningData = ExecuteDataTable("Planning_UserInput_S", sParams);
                if (dsPlanningData.Tables[0].Columns.Contains("ERROR_NUMBER"))
                {
                    throw new Exception("Database Error");
                }
                else if (dsPlanningData.Tables[0].Rows.Count >= 1)
                {
                    DataTable dtPlanningData = dsPlanningData.Tables[0];
                    objListPlanningDataInputModel = GetGridModelForDataInput(dtPlanningData);
                }
                else
                {
                    objListPlanningDataInputModel = new List<PlanningDataInputModel> { new PlanningDataInputModel() };
                    return objListPlanningDataInputModel;
                }

            }
            catch (Exception ex)
            {
                objListPlanningDataInputModel = new List<PlanningDataInputModel> { new PlanningDataInputModel() };
                return objListPlanningDataInputModel;
            }
            return objListPlanningDataInputModel;
        }

        public List<PlanningDataInputModel> GetWeekWiseGridByCategory(string categoryID)
        {
            List<Planning.Models.PlanningDataInputModel> objListPlanningDataInputModel = new List<Planning.Models.PlanningDataInputModel>();
            try
            {
                PlanningDataInputModel objPlanningDataInputModel = null;
                SqlParameter[] sParams = new SqlParameter[1]; // Parameter count

                sParams[0] = new SqlParameter();
                sParams[0].SqlDbType = SqlDbType.VarChar;
                sParams[0].ParameterName = "@CategoryID";
                sParams[0].Value = categoryID;
                DataSet dsPlanning = ExecuteDataTable("Planning_UserInput_S", sParams);
                if (dsPlanning.Tables[0].Columns.Contains("ERROR_NUMBER"))
                {
                    throw new Exception("Database Error");
                }
                else if (dsPlanning.Tables.Count > 0)
                {
                    DataTable dtPlanningData = dsPlanning.Tables[0];
                    if (!dtPlanningData.Columns.Contains("info"))
                    {
                        string weekName = "";
                        string IsWeekVisible = "";
                        if (dtPlanningData != null)
                        {
                            if (dtPlanningData.Rows.Count > 0)
                            {
                                List<int> objLstColumnSequence = new List<int>();
                                Dictionary<string, string> objWeekStartDate = new Dictionary<string, string>();
                                foreach (DataColumn column in dtPlanningData.Columns)
                                {
                                    int weekColumnName;
                                    if (int.TryParse(column.ColumnName, out weekColumnName))
                                    {
                                        objLstColumnSequence.Add(weekColumnName);
                                        objWeekStartDate.Add(weekColumnName.ToString(), FirstDateOfWeek(Convert.ToDateTime(dtPlanningData.Rows[0]["PlanningWeekStartDate"]).Year, weekColumnName));
                                    }
                                }
                                ViewData["WeekColumnPoition"] = objLstColumnSequence;
                                ViewData["WeekStartDate"] = objWeekStartDate;
                                TempData["fromDate"] = Convert.ToDateTime(dtPlanningData.Rows[0]["PlanningWeekStartDate"]).ToString("yyyy-MM-dd");
                                TempData["toDate"] = Convert.ToDateTime(dtPlanningData.Rows[0]["planningWeekEndDate"]).ToString("yyyy-MM-dd"); ;
                                TempData["CategoryDataExist"] = true;
                                for (int i = 0; i < dtPlanningData.Rows.Count; i++)
                                {
                                    objPlanningDataInputModel = new PlanningDataInputModel();
                                    objPlanningDataInputModel.ModelId = Convert.ToInt32(dtPlanningData.Rows[i]["ModelId"]);
                                    objPlanningDataInputModel.ModelName = Convert.ToString(dtPlanningData.Rows[i]["ModelName"]);
                                    //objPlanningDataInputModel.AssemblyName = Convert.ToString(dtPlanningData.Rows[i]["AssemblyName"]);
                                    for (int j = 1; j <= 52; j++)
                                    {
                                        weekName = "week" + j;
                                        IsWeekVisible = "Isweek" + j + "Visible";
                                        if (dtPlanningData.Columns.Contains(j.ToString().Trim()))
                                        {
                                            PropertyInfo propertyInfo = objPlanningDataInputModel.GetType().GetProperty(IsWeekVisible);
                                            propertyInfo.SetValue(objPlanningDataInputModel, Convert.ChangeType(Convert.ToBoolean(false), propertyInfo.PropertyType), null);
                                            if (!(string.IsNullOrEmpty(Convert.ToString(dtPlanningData.Rows[i][j.ToString().Trim()]))))
                                            {
                                                if (Convert.ToString(dtPlanningData.Rows[i][j.ToString().Trim()]) != "")
                                                {
                                                    PropertyInfo propertyInfo1 = objPlanningDataInputModel.GetType().GetProperty(weekName);
                                                    propertyInfo1.SetValue(objPlanningDataInputModel, Convert.ChangeType(Convert.ToInt32(dtPlanningData.Rows[i][j.ToString().Trim()] ?? "0"), propertyInfo1.PropertyType), null);
                                                }
                                            }
                                        }
                                        else
                                        {
                                            PropertyInfo propertyInfo = objPlanningDataInputModel.GetType().GetProperty(IsWeekVisible);
                                            propertyInfo.SetValue(objPlanningDataInputModel, Convert.ChangeType(Convert.ToBoolean(true), propertyInfo.PropertyType), null);
                                        }

                                    }
                                    objListPlanningDataInputModel.Add(objPlanningDataInputModel);
                                }

                            }
                        }
                    }
                    else
                    {
                        objPlanningDataInputModel = new Planning.Models.PlanningDataInputModel();
                        TempData["CategoryDataExist"] = false;
                        TempData["CategoryMessage"] = Convert.ToString(dtPlanningData.Rows[0][0]);
                        objListPlanningDataInputModel.Add(objPlanningDataInputModel);
                        return objListPlanningDataInputModel;

                    }
                }
                else
                {
                    objPlanningDataInputModel = new Planning.Models.PlanningDataInputModel();
                    TempData["CategoryDataExist"] = false;
                    objListPlanningDataInputModel.Add(objPlanningDataInputModel);
                    return objListPlanningDataInputModel;
                }
            }
            catch (Exception ex)
            {
                objListPlanningDataInputModel = new List<PlanningDataInputModel> { new PlanningDataInputModel() };
                return objListPlanningDataInputModel;
            }
            return objListPlanningDataInputModel;

        }

        [GridDataSourceAction]
        public ActionResult GetWeekWiseGridByCategoryJson(string categoryID, string fromDate, string toDate)
        {
            try
            {

            }
            catch (Exception ex)
            { }
            var model = GetWeekWiseGridByCategory(categoryID).AsQueryable();
            return View("~/Views/Planning/DataEntry.cshtml", model);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="dtPlanningData"></param>
        /// <returns></returns>
        private List<PlanningDataInputModel> GetGridModelForDataInput(DataTable dtPlanningData)
        {
            List<Planning.Models.PlanningDataInputModel> objListPlanningDataInputModel = new List<Planning.Models.PlanningDataInputModel>();
            try
            {
                if (dtPlanningData != null)
                {
                    if (dtPlanningData.Rows.Count > 0)
                    {

                        // Store column header name in List for conditionally showing column sequence in Grid.
                        List<int> objLstColumnSequence = new List<int>();
                        Dictionary<string, string> objWeekStartDate = new Dictionary<string, string>();
                        foreach (DataColumn column in dtPlanningData.Columns)
                        {
                            int weekColumnName;
                            if (int.TryParse(column.ColumnName, out weekColumnName))
                            {
                                objLstColumnSequence.Add(weekColumnName);
                                objWeekStartDate.Add(weekColumnName.ToString(), FirstDateOfWeek(Convert.ToDateTime(dtPlanningData.Rows[0]["PlanningWeekStartDate"]).Year, weekColumnName));
                            }
                        }
                        ViewData["WeekColumnPoition"] = objLstColumnSequence;
                        ViewData["WeekStartDate"] = objWeekStartDate;
                        TempData["CategoryDataExist"] = true;
                        PlanningDataInputModel objPlanningDataInputModel = null;
                        string week = "";
                        if (dtPlanningData != null)
                        {
                            if (dtPlanningData.Rows.Count > 0)
                            {
                                for (int i = 0; i < dtPlanningData.Rows.Count; ++i)
                                {

                                    objPlanningDataInputModel = new PlanningDataInputModel();
                                    objPlanningDataInputModel.ModelId = Convert.ToInt32(dtPlanningData.Rows[i]["ModelId"]);
                                    objPlanningDataInputModel.ModelName = Convert.ToString(dtPlanningData.Rows[i]["ModelName"]);

                                    for (int j = 1; j <= 52; j++)
                                    {
                                        string weekName = "week" + j;
                                        string IsWeekVisible = "Isweek" + j + "Visible";
                                        if (dtPlanningData.Columns.Contains(j.ToString().Trim()))
                                        {
                                            PropertyInfo propertyInfo = objPlanningDataInputModel.GetType().GetProperty(IsWeekVisible);
                                            propertyInfo.SetValue(objPlanningDataInputModel, Convert.ChangeType(Convert.ToBoolean(false), propertyInfo.PropertyType), null);
                                            if (!(string.IsNullOrEmpty(Convert.ToString(dtPlanningData.Rows[i][j.ToString().Trim()]))))
                                            {
                                                if (Convert.ToString(dtPlanningData.Rows[i][j.ToString().Trim()]) != "")
                                                {
                                                    PropertyInfo propertyInfo1 = objPlanningDataInputModel.GetType().GetProperty(weekName);
                                                    propertyInfo1.SetValue(objPlanningDataInputModel, Convert.ChangeType(Convert.ToInt32(dtPlanningData.Rows[i][j.ToString().Trim()] ?? "0"), propertyInfo1.PropertyType), null);
                                                }
                                            }
                                        }
                                        else
                                        {
                                            PropertyInfo propertyInfo = objPlanningDataInputModel.GetType().GetProperty(IsWeekVisible);
                                            propertyInfo.SetValue(objPlanningDataInputModel, Convert.ChangeType(Convert.ToBoolean(true), propertyInfo.PropertyType), null);
                                        }
                                    }
                                    objListPlanningDataInputModel.Add(objPlanningDataInputModel);
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                objListPlanningDataInputModel = new List<PlanningDataInputModel> { new PlanningDataInputModel() };
                return objListPlanningDataInputModel;
            }
            return objListPlanningDataInputModel;
        }

        [HttpPost]
        public ActionResult SaveData()
        {
            JsonResult result = new JsonResult();
            Dictionary<string, bool> response = new Dictionary<string, bool>();
            try
            {
                GridModel gridModel = new GridModel();
                List<Transaction<Planning.Models.PlanningDataInputModel>> transactions = gridModel.LoadTransactions<Planning.Models.PlanningDataInputModel>(HttpContext.Request.Form["ig_transactions"]);
                foreach (Transaction<Planning.Models.PlanningDataInputModel> t in transactions)
                {
                    int ModelId = Convert.ToInt32(t.rowId);
                    List<int> lstModelAssemblyId = GetModelAssemblyID(ModelId);
                    if (lstModelAssemblyId != null)
                    {
                        if (lstModelAssemblyId.Count >= 1)
                        {
                            foreach (int ModelAssemblyId in lstModelAssemblyId) // Loop through List with foreach
                            {
                                string SQlUpdateQuery = "Update PlanningUserInput set ";
                                for (int j = 1; j <= 52; j++)
                                {
                                    string weekName = "week" + j;
                                    if (!string.IsNullOrEmpty(weekName))
                                    {
                                        PropertyInfo propertyInfo = t.row.GetType().GetProperty(weekName);
                                        int dataValue = Convert.ToInt32(propertyInfo.GetValue(t.row));
                                        if (j == 52)
                                        {
                                            SQlUpdateQuery += " [" + weekName.Replace("week", "") + "]=" + dataValue + "";
                                        }
                                        else
                                        {
                                            SQlUpdateQuery += " [" + weekName.Replace("week", "") + "]=" + dataValue + ",";
                                        }
                                    }
                                }
                                SQlUpdateQuery += " where ModelAssemblyId = " + ModelAssemblyId;
                                string ConnString = ConfigurationManager.ConnectionStrings["PlanningConnectionString"].ConnectionString;
                                using (SqlConnection connection = new SqlConnection(ConnString))
                                {
                                    using (SqlCommand cmd = connection.CreateCommand())
                                    {
                                        cmd.CommandText = SQlUpdateQuery;
                                        cmd.Connection.Open();
                                        cmd.ExecuteNonQuery();
                                    }
                                }
                            }
                        }
                    }
                }

                response.Add("Success", true);
                result.Data = response;
            }
            catch (Exception ex)
            {
                response.Add("Success", false);
                result.Data = response;

            }
            return result;
        }

        [HttpGet]
        public JsonResult GetBaseCategories()
        {
            DataTable dtCategory = new DataTable();
            List<BaseCategoryModel> objListCategoryModel = new List<BaseCategoryModel>();
            try
            {
                DataSet dsCategory = ExecuteDataTable("Planning_BaseCategories_S", null);
                if (dsCategory.Tables[0].Columns.Contains("ERROR_NUMBER"))
                {
                    throw new Exception("Database Error");
                }
                dtCategory = dsCategory.Tables[0];
                BaseCategoryModel objCategory = new BaseCategoryModel { BaseCategoryId = 0, BaseCategoryName = "Selec Category" };
                objListCategoryModel.Add(objCategory);
                if (dtCategory != null)
                {
                    if (dtCategory.Rows.Count > 0)
                    {
                        for (int i = 0; i < dtCategory.Rows.Count; i++)
                        {
                            objCategory = new BaseCategoryModel
                            {
                                BaseCategoryId = Convert.ToInt32(dtCategory.Rows[i]["BaseCategoryId"]),
                                BaseCategoryName = Convert.ToString(dtCategory.Rows[i]["BaseCategoryName"])
                            };
                            objListCategoryModel.Add(objCategory);
                        }
                    }
                }
                objListCategoryModel.ToList();
            }
            catch (Exception ex)
            {
                BaseCategoryModel objCategory = new BaseCategoryModel { BaseCategoryId = 0, BaseCategoryName = "Select Category" };
                objListCategoryModel.Add(objCategory);
                objListCategoryModel.ToList();
                return Json(objListCategoryModel, JsonRequestBehavior.AllowGet);
            }
            return Json(objListCategoryModel, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetCategories(string BaseCategoryId)
        {
            DataTable dtCategory = new DataTable();
            List<CategoryModel> objListCategoryModel = new List<CategoryModel>();
            try
            {

                SqlParameter[] sParams = new SqlParameter[1];
                sParams[0] = new SqlParameter();
                sParams[0].SqlDbType = SqlDbType.Int;
                sParams[0].ParameterName = "@BaseCategoryId";
                sParams[0].Value = BaseCategoryId;
                DataSet dsCategory = ExecuteDataTable("Planning_Categories_S", sParams);
                if (dsCategory.Tables[0].Columns.Contains("ERROR_NUMBER"))
                {
                    throw new Exception("Database Error");
                }
                dtCategory = dsCategory.Tables[0];
                CategoryModel objCategory = null; //{ CategoryId = 0, CategoryName = "Select Sub Category" };
                if (dtCategory != null)
                {
                    if (dtCategory.Rows.Count > 0)
                    {
                        for (int i = 0; i < dtCategory.Rows.Count; i++)
                        {
                            objCategory = new CategoryModel
                            {
                                CategoryId = Convert.ToInt32(dtCategory.Rows[i]["CategoryId"]),
                                CategoryName = Convert.ToString(dtCategory.Rows[i]["CategoryName"]),
                                IsDataExist = Convert.ToInt32(dtCategory.Rows[i]["IsDataExist"]),
                            };
                            objListCategoryModel.Add(objCategory);
                        }
                    }
                    else
                    {
                        objCategory = new CategoryModel();
                        objListCategoryModel.Add(objCategory);
                    }
                }
                else
                {
                    objCategory = new CategoryModel();
                    objListCategoryModel.Add(objCategory);
                }
                objListCategoryModel.ToList();
            }
            catch (Exception ex)
            {
                CategoryModel objCategory = new CategoryModel(); //{ CategoryId = 0, CategoryName = "Select Sub Category" };
                objListCategoryModel.Add(objCategory);
                objListCategoryModel.ToList();
                return Json(objListCategoryModel, JsonRequestBehavior.AllowGet);
            }
            return Json(objListCategoryModel, JsonRequestBehavior.AllowGet);
        }
        private static string FirstDateOfWeek(int year, int weekOfYear)
        {
            var firstDate = new DateTime(year, 1, 1);
            //first thursday of the week defines the first week (https://en.wikipedia.org/wiki/ISO_8601)
            //Wiki: the 4th of january is always in the first week
            while (firstDate.DayOfWeek != DayOfWeek.Monday)
                firstDate = firstDate.AddDays(-1);

            return firstDate.AddDays((weekOfYear - 1) * 7).ToString("MM/dd/yyyy");
        }
        public List<int> GetModelAssemblyID(int modelId)
        {
            List<int> lstModelAssemblyId = null;
            try
            {
                Dictionary<int, int> objModelAssembly = new Dictionary<int, int>();
                SqlParameter[] sParams = new SqlParameter[1];
                sParams[0] = new SqlParameter();
                sParams[0].SqlDbType = SqlDbType.Int;
                sParams[0].ParameterName = "@ModelId";
                sParams[0].Value = modelId;
                DataSet dsModelAssemblyId = ExecuteDataTable("GetModelAssembyIdByModel", sParams);
                if (dsModelAssemblyId.Tables.Count >= 1)
                {
                    if (dsModelAssemblyId.Tables[0].Columns.Contains("ERROR_NUMBER"))
                    {
                        throw new Exception("Database Error");
                    }
                    else if (dsModelAssemblyId.Tables[0].Rows.Count >= 1)
                    {
                        DataTable dtModelAssemblyId = dsModelAssemblyId.Tables[0];
                        lstModelAssemblyId = new List<int>(dtModelAssemblyId.Rows.Count);
                        foreach (DataRow row in dtModelAssemblyId.Rows)
                        {
                            lstModelAssemblyId.Add((int)row["ModelAssemblyId"]);
                        }
                        return lstModelAssemblyId;
                    }
                }
            }
            catch (Exception ex)
            {
                return lstModelAssemblyId;
            }
            return lstModelAssemblyId;
        }

        public static DataSet ExecuteDataTable(string storedProcedureName,
                                     params SqlParameter[] arrParam)
        {

            DataSet ds = new DataSet();

            try
            {
                // Open the connection 
                string cs = ConfigurationManager.ConnectionStrings["PlanningConnectionString"].ConnectionString;
                using (SqlConnection cnn = new SqlConnection(cs))
                {
                    cnn.Open();

                    // Define the command 
                    using (SqlCommand cmd = new SqlCommand())
                    {
                        cmd.Connection = cnn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = storedProcedureName;

                        // Handle the parameters 
                        if (arrParam != null)
                        {
                            foreach (SqlParameter param in arrParam)
                                cmd.Parameters.Add(param);
                        }

                        // Define the data adapter and fill the dataset 
                        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                        {
                            da.Fill(ds);
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return ds;
        }
    }
}