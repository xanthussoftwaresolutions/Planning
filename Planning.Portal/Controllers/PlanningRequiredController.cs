using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Planning.Portal.Models;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Configuration;

namespace Planning.Portal.Controllers
{
    public class PlanningRequiredController : Controller
    {
        // GET: PlanningRequired
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult SubtotalReport(string categoryId)
        {
            List<PlanningReportModel> objListPlanningReportModel = new List<PlanningReportModel>();
            PlanningReportModel objPlanningReportModel = new Planning.Portal.Models.PlanningReportModel();
            try
            {
                if (!string.IsNullOrEmpty(categoryId))
                {
                    TempData["categoryId"] = categoryId;
                    objListPlanningReportModel = GetSubtotalReportByCategory(categoryId.ToString().Trim());
                }
                else
                {
                    //TempData["Error"] = "Planning stocks report is not generated for selected category.";
                    objListPlanningReportModel.Add(objPlanningReportModel);

                }
            }
            catch (Exception ex)
            {
                objPlanningReportModel = new Planning.Portal.Models.PlanningReportModel();
                objListPlanningReportModel.Add(objPlanningReportModel);
                TempData["Error"] = " Request Processing has encountered an unknown error";
            }
            var model = objListPlanningReportModel.AsQueryable();
            return View("~/Views/Planning/SubtotalReport.cshtml", model);
        }

        [ActionName("SubtotalReport")]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult SubtotalReport(FormCollection frm)
        {
            List<PlanningReportModel> objListPlanningReportModel = new List<PlanningReportModel>();
            string categoryId = "";
            try
            {
                if (Request.Form["hdnitem_Category"] != null)
                {
                    categoryId = Request.Form["hdnitem_Category"];
                    TempData["categoryId"] = categoryId;
                    if (!string.IsNullOrEmpty(categoryId))
                    {
                        TempData["categoryId"] = categoryId;
                        objListPlanningReportModel = GetSubtotalReportByCategory(categoryId.ToString().Trim());
                    }
                    else
                    {
                        TempData["Error"] = "Report not found for selected category.";
                        PlanningReportModel objPlanningReportModel = new Planning.Portal.Models.PlanningReportModel();
                        objListPlanningReportModel.Add(objPlanningReportModel);
                    }

                }
            }
            catch (Exception ex)
            {
                PlanningReportModel objPlanningReportModel = new Planning.Portal.Models.PlanningReportModel();
                objListPlanningReportModel.Add(objPlanningReportModel);
                TempData["Error"] = "Report not found for selected category.";
            }
            var model = objListPlanningReportModel.AsQueryable();
            return View("~/Views/Planning/SubtotalReport.cshtml", model);
        }

        public List<PlanningReportModel> GetSubtotalReportByCategory(string categoryID)
        {
            List<Planning.Portal.Models.PlanningReportModel> objListPlanningReportModel = new List<Planning.Portal.Models.PlanningReportModel>();
            try
            {
                PlanningReportModel objPlanningReportModel = null;
                SqlParameter[] sParams = new SqlParameter[1]; // Parameter count

                sParams[0] = new SqlParameter();
                sParams[0].SqlDbType = SqlDbType.Int;
                sParams[0].ParameterName = "@CategoryID";
                sParams[0].Value = categoryID;

                DataSet dsPlanningReprt = ExecuteDataTable("GetTotalRequiredProductQuantity_S", sParams);
                if (dsPlanningReprt.Tables[0].Columns.Contains("ERROR_NUMBER"))
                {
                    if (Convert.ToInt32(dsPlanningReprt.Tables[0].Rows[0]["ERROR_NUMBER"]) == 1)
                    {
                        throw new Exception("DataBase Error");
                    }
                }
                DataTable dtPlanningReport = dsPlanningReprt.Tables[0];
                string weekName = "";
                string IsWeekVisible = "";
                if (dtPlanningReport != null)
                {
                    if (dtPlanningReport.Rows.Count > 0)
                    {
                        for (int i = 0; i < dtPlanningReport.Rows.Count; i++)
                        {
                            objPlanningReportModel = new PlanningReportModel();
                            //objPlanningReportModel.ModelAssemblyId = Convert.ToInt32(dtPlanningReport.Rows[i]["ModelAssemblyId"]);
                            //objPlanningReportModel.ModelName = Convert.ToString(dtPlanningReport.Rows[i]["ModelName"]);
                            //objPlanningReportModel.AssemblyName = Convert.ToString(dtPlanningReport.Rows[i]["AssemblyName"]);
                            objPlanningReportModel.ItemName = Convert.ToString(dtPlanningReport.Rows[i]["ItemName"]);
                            //objPlanningReportModel.CurrentStock = Convert.ToString(dtPlanningReport.Rows[i]["CurrentStock"]);


                            for (int j = 1; j <= 52; j++)
                            {
                                weekName = "week" + j;
                                IsWeekVisible = "Isweek" + j + "Visible";
                                if (dtPlanningReport.Columns.Contains(j.ToString().Trim()))
                                {
                                    PropertyInfo propertyInfo = objPlanningReportModel.GetType().GetProperty(IsWeekVisible);
                                    propertyInfo.SetValue(objPlanningReportModel, Convert.ChangeType(Convert.ToBoolean(false), propertyInfo.PropertyType), null);
                                    if (!(string.IsNullOrEmpty(Convert.ToString(dtPlanningReport.Rows[i][j.ToString().Trim()]))))
                                    {
                                        if (Convert.ToString(dtPlanningReport.Rows[i][j.ToString().Trim()]) != "")
                                        {
                                            PropertyInfo propertyInfo1 = objPlanningReportModel.GetType().GetProperty(weekName);
                                            propertyInfo1.SetValue(objPlanningReportModel, Convert.ChangeType(Convert.ToInt32(dtPlanningReport.Rows[i][j.ToString().Trim()] ?? "0"), propertyInfo1.PropertyType), null);
                                        }
                                    }
                                }
                                else
                                {
                                    PropertyInfo propertyInfo = objPlanningReportModel.GetType().GetProperty(IsWeekVisible);
                                    propertyInfo.SetValue(objPlanningReportModel, Convert.ChangeType(Convert.ToBoolean(true), propertyInfo.PropertyType), null);
                                }

                            }
                            objListPlanningReportModel.Add(objPlanningReportModel);
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                Planning.Portal.Models.PlanningReportModel objPlanningReportModel = new Planning.Portal.Models.PlanningReportModel();
                objListPlanningReportModel.Add(objPlanningReportModel);
                return objListPlanningReportModel;
            }
            return objListPlanningReportModel;

        }

        public List<PlanningReportModel> GetWeekWiseSubtotalReportGrid(string categoryID)
        {
            List<PlanningReportModel> objListPlanningReportModel = new List<PlanningReportModel>();
            try
            {
                SqlParameter[] sParams = new SqlParameter[1]; // Parameter count
                sParams[0] = new SqlParameter();
                sParams[0].SqlDbType = SqlDbType.Int;
                sParams[0].ParameterName = "@CategoryID";
                sParams[0].Value = categoryID;
                DataSet dsPlanningData = ExecuteDataTable("GetTotalRequiredProductQuantity_S", sParams);
                TempData["CategoryDataExist"] = false;
                if (dsPlanningData.Tables.Count > 0)
                {
                    if (dsPlanningData.Tables[0].Rows.Count >= 1)
                    {
                        objListPlanningReportModel = GetGridModelForSubtotalReport(dsPlanningData.Tables[0]);
                        TempData["CategoryDataExist"] = true;
                    }
                    else
                    {
                        Planning.Portal.Models.PlanningReportModel objPlanningReportModel = new Planning.Portal.Models.PlanningReportModel();
                        objListPlanningReportModel.Add(objPlanningReportModel);
                        return objListPlanningReportModel;
                    }

                }
                else
                {
                    Planning.Portal.Models.PlanningReportModel objPlanningReportModel = new Planning.Portal.Models.PlanningReportModel();
                    objListPlanningReportModel.Add(objPlanningReportModel);
                    return objListPlanningReportModel;
                }

            }
            catch (Exception ex)
            {
                Planning.Portal.Models.PlanningReportModel objPlanningReportModel = new Planning.Portal.Models.PlanningReportModel();
                objListPlanningReportModel.Add(objPlanningReportModel);
                return objListPlanningReportModel;
            }
            return objListPlanningReportModel;
        }

        private List<PlanningReportModel> GetGridModelForSubtotalReport(DataTable dtPlanningReprt)
        {
            List<Planning.Portal.Models.PlanningReportModel> objListPlanningReportModel = new List<Planning.Portal.Models.PlanningReportModel>();
            try
            {
                // Store column header name in List for conditionally showing column sequence in Grid.
                List<int> objLstColumnSequence = new List<int>();
                Dictionary<string, string> objWeekStartDate = new Dictionary<string, string>();
                foreach (DataColumn column in dtPlanningReprt.Columns)
                {
                    int weekColumnName;
                    if (int.TryParse(column.ColumnName, out weekColumnName))
                    {
                        objLstColumnSequence.Add(weekColumnName);
                        objWeekStartDate.Add(weekColumnName.ToString(), FirstDateOfWeek(Convert.ToDateTime(dtPlanningReprt.Rows[0]["PlanningWeekStartDate"]).Year, weekColumnName));
                    }
                }
                ViewData["WeekColumnPoition"] = objLstColumnSequence;
                ViewData["WeekStartDate"] = objWeekStartDate;
                PlanningReportModel objPlanningReportModel = null;
                string week = "";
                if (dtPlanningReprt != null)
                {
                    if (dtPlanningReprt.Rows.Count > 0)
                    {
                        for (int i = 0; i < dtPlanningReprt.Rows.Count; ++i)
                        {
                            objPlanningReportModel = new PlanningReportModel();
                            //objPlanningReportModel.ModelAssemblyId = Convert.ToInt32(dtPlanningReprt.Rows[i]["ModelAssemblyId"]);
                            //objPlanningReportModel.ModelName = Convert.ToString(dtPlanningReprt.Rows[i]["ModelName"]);
                            //objPlanningReportModel.AssemblyName = Convert.ToString(dtPlanningReprt.Rows[i]["AssemblyName"]);
                            objPlanningReportModel.ItemName = Convert.ToString(dtPlanningReprt.Rows[i]["ItemName"]);


                            for (int j = 1; j <= 52; j++)
                            {
                                string weekName = "week" + j;
                                string IsWeekVisible = "Isweek" + j + "Visible";
                                if (dtPlanningReprt.Columns.Contains(j.ToString().Trim()))
                                {
                                    PropertyInfo propertyInfo = objPlanningReportModel.GetType().GetProperty(IsWeekVisible);
                                    propertyInfo.SetValue(objPlanningReportModel, Convert.ChangeType(Convert.ToBoolean(false), propertyInfo.PropertyType), null);

                                    if (!(string.IsNullOrEmpty(Convert.ToString(dtPlanningReprt.Rows[i][j.ToString().Trim()]))))
                                    {
                                        if (Convert.ToString(dtPlanningReprt.Rows[i][j.ToString().Trim()]) != "")
                                        {
                                            PropertyInfo propertyInfo1 = objPlanningReportModel.GetType().GetProperty(weekName);
                                            propertyInfo1.SetValue(objPlanningReportModel, Convert.ChangeType(Convert.ToInt32(dtPlanningReprt.Rows[i][j.ToString().Trim()] ?? "0"), propertyInfo1.PropertyType), null);
                                        }
                                    }
                                }
                                else
                                {
                                    PropertyInfo propertyInfo = objPlanningReportModel.GetType().GetProperty(IsWeekVisible);
                                    propertyInfo.SetValue(objPlanningReportModel, Convert.ChangeType(Convert.ToBoolean(true), propertyInfo.PropertyType), null);
                                }
                            }
                            objListPlanningReportModel.Add(objPlanningReportModel);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Planning.Portal.Models.PlanningReportModel objPlanningReportModel = new Planning.Portal.Models.PlanningReportModel();
                objListPlanningReportModel.Add(objPlanningReportModel);
                return objListPlanningReportModel;
            }
            return objListPlanningReportModel;
        }

        [HttpGet]
        public JsonResult GetCategories()
        {
            DataTable dtCategory = new DataTable();
            List<CategoryModel> objListCategoryModel = new List<CategoryModel>();
            try
            {
                DataSet dsCategory = ExecuteDataTable("Planning_Categories_S", null);
                if (dsCategory.Tables[0].Columns.Contains("ERROR_NUMBER"))
                {
                    if (Convert.ToInt32(dsCategory.Tables[0].Rows[0]["ERROR_NUMBER"]) == 1)
                    {
                        throw new Exception("Database Error");
                    }
                }
                dtCategory = dsCategory.Tables[0];
                CategoryModel objCategory = new CategoryModel { CategoryId = 0, CategoryName = "Select Category" };
                objListCategoryModel.Add(objCategory);
                if (dtCategory != null)
                {
                    if (dtCategory.Rows.Count > 0)
                    {
                        for (int i = 0; i < dtCategory.Rows.Count; i++)
                        {
                            objCategory = new CategoryModel
                            {
                                CategoryId = Convert.ToInt32(dtCategory.Rows[i]["CategoryId"]),
                                CategoryName = Convert.ToString(dtCategory.Rows[i]["CategoryName"])
                            };
                            objListCategoryModel.Add(objCategory);
                        }
                    }
                }
                objListCategoryModel.ToList();
            }
            catch (Exception ex)
            {
                CategoryModel objCategory = new CategoryModel { CategoryId = 0, CategoryName = "Select Category" };
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
                        cmd.CommandTimeout = 120;
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