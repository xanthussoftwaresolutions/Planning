using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Planning.Models;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Configuration;
namespace Planning.Portal.Controllers
{
    public class ReportController : Controller
    {
        // GET: Report
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult PlanningReport(string categoryId)
        {
            List<PlanningReportModel> objListPlanningReportModel = new List<PlanningReportModel>();
            PlanningReportModel objPlanningReportModel = new Planning.Models.PlanningReportModel();
            try
            {

                if (Session["categoryId"] != null && categoryId == null)
                {
                    categoryId = Convert.ToString(Session["categoryId"]);
                    Session["categoryId"] = null;
                }
                if (!string.IsNullOrEmpty(categoryId))
                {
                    TempData["subCategoryId"] = categoryId;
                    objListPlanningReportModel = GetWeekWiseGrid(categoryId.ToString().Trim());
                }
                else
                {
                    //TempData["Error"] = "Planning stocks report is not generated for selected category.";
                    objListPlanningReportModel.Add(objPlanningReportModel);

                }
            }
            catch (Exception ex)
            {
                objPlanningReportModel = new Planning.Models.PlanningReportModel();
                objListPlanningReportModel.Add(objPlanningReportModel);
                TempData["Error"] = " Request Processing has encountered an unknown error";
            }
            var model = objListPlanningReportModel.AsQueryable();
            return View("~/Views/Planning/PlanningReport.cshtml", model);
        }

        [ActionName("PlanningReport")]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult PlanningReport(FormCollection frm)
        {
            List<PlanningReportModel> objListPlanningReportModel = new List<PlanningReportModel>();
            string subCategoryId = "";
            string baseCategoryId = "";
            try
            {
                if (Request.Form["hdnitem_SubCategory"] != null && Request.Form["hdnitem_BaseCategory"] != null)
                {
                    subCategoryId = Request.Form["hdnitem_SubCategory"];
                    baseCategoryId = Request.Form["hdnitem_BaseCategory"];
                    TempData["subCategoryId"] = subCategoryId;
                    TempData["baseCategoryId"] = baseCategoryId;
                    bool isProcess = Convert.ToBoolean(Request.Form["hdnitem_isProcess"]);
                    bool IsReportGenerated = false;
                    if ((!string.IsNullOrEmpty(subCategoryId)) && isProcess)
                    {
                        IsReportGenerated = ProcessData(subCategoryId);
                    }
                    if (!string.IsNullOrEmpty(subCategoryId))
                    {
                        TempData["subCategoryId"] = subCategoryId;
                        objListPlanningReportModel = GetWeekWiseGrid(subCategoryId.ToString().Trim());
                    }
                    else
                    {
                        TempData["Info"] = "Planning stocks report is not generated for selected category.";
                        PlanningReportModel objPlanningReportModel = new Planning.Models.PlanningReportModel();
                        objListPlanningReportModel.Add(objPlanningReportModel);
                    }

                }
            }
            catch (Exception ex)
            {
                PlanningReportModel objPlanningReportModel = new Planning.Models.PlanningReportModel();
                objListPlanningReportModel.Add(objPlanningReportModel);
                TempData["Error"] = "Planning stocks report is not generated for selected category.";
            }
            var model = objListPlanningReportModel.AsQueryable();
            return View("~/Views/Planning/PlanningReport.cshtml", model);
        }

        public List<PlanningReportModel> GetPlanningReportByCategory(string categoryID)
        {
            List<Planning.Models.PlanningReportModel> objListPlanningReportModel = new List<Planning.Models.PlanningReportModel>();
            try
            {
                PlanningReportModel objPlanningReportModel = null;
                SqlParameter[] sParams = new SqlParameter[1]; // Parameter count

                sParams[0] = new SqlParameter();
                sParams[0].SqlDbType = SqlDbType.VarChar;
                sParams[0].ParameterName = "@CategoryID";
                sParams[0].Value = categoryID;

                DataTable dtPlanningReport = ExecuteDataTable("GetPlanningReport_S", sParams).Tables[0];
                string weekName = "";
                string IsWeekVisible = "";
                if (dtPlanningReport != null)
                {
                    if (dtPlanningReport.Rows.Count > 0)
                    {
                        for (int i = 0; i < dtPlanningReport.Rows.Count; i++)
                        {
                            objPlanningReportModel = new PlanningReportModel();
                            objPlanningReportModel.ModelAssemblyId = Convert.ToInt32(dtPlanningReport.Rows[i]["ModelAssemblyId"]);
                            objPlanningReportModel.ModelName = Convert.ToString(dtPlanningReport.Rows[i]["ModelName"]);
                            objPlanningReportModel.AssemblyName = Convert.ToString(dtPlanningReport.Rows[i]["AssemblyName"]);
                            objPlanningReportModel.ItemName = Convert.ToString(dtPlanningReport.Rows[i]["ItemName"]);
                            objPlanningReportModel.CurrentStock = Convert.ToString(dtPlanningReport.Rows[i]["CurrentStock"]);


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
                Planning.Models.PlanningReportModel objPlanningReportModel = new Planning.Models.PlanningReportModel();
                objListPlanningReportModel.Add(objPlanningReportModel);
                return objListPlanningReportModel;
            }
            return objListPlanningReportModel;

        }

        public List<PlanningReportModel> GetWeekWiseGrid(string categoryID)
        {
            List<PlanningReportModel> objListPlanningReportModel = new List<PlanningReportModel>();
            try
            {
                TempData["CategoryDataExist"] = false;
                SqlParameter[] sParams = new SqlParameter[1]; // Parameter count
                sParams[0] = new SqlParameter();
                sParams[0].SqlDbType = SqlDbType.VarChar;
                sParams[0].ParameterName = "@CategoryID";
                sParams[0].Value = categoryID;

                DataSet dsPlanningData = ExecuteDataTable("GetPlanningReportForItemName_S", sParams);
                if (dsPlanningData.Tables.Count >= 1)
                {
                    if (dsPlanningData.Tables[0].Columns.Contains("ERROR_NUMBER"))
                    {
                        TempData["CategoryDataExist"] = false;
                        throw new Exception("Planning report has not been generated for selected category");
                    }
                    else if (dsPlanningData.Tables[0].Rows.Count >= 1)
                    {
                        TempData["CategoryDataExist"] = true;
                        objListPlanningReportModel = GetGridModelForReport(dsPlanningData.Tables[0]);
                    }
                    else
                    {
                        Planning.Models.PlanningReportModel objPlanningReportModel = new Planning.Models.PlanningReportModel();
                        objListPlanningReportModel.Add(objPlanningReportModel);
                        return objListPlanningReportModel;
                    }
                }
                else
                {
                    Planning.Models.PlanningReportModel objPlanningReportModel = new Planning.Models.PlanningReportModel();
                    objListPlanningReportModel.Add(objPlanningReportModel);
                    return objListPlanningReportModel;
                }
            }
            catch (Exception ex)
            {
                TempData["CategoryDataExist"] = false;
                Planning.Models.PlanningReportModel objPlanningReportModel = new Planning.Models.PlanningReportModel();
                objListPlanningReportModel.Add(objPlanningReportModel);
                return objListPlanningReportModel;
            }
            return objListPlanningReportModel;
        }

        public List<PlanningReportModel> GetSubtotalReportByCategory(string categoryID)
        {
            List<Planning.Models.PlanningReportModel> objListPlanningReportModel = new List<Planning.Models.PlanningReportModel>();
            try
            {
                PlanningReportModel objPlanningReportModel = null;
                SqlParameter[] sParams = new SqlParameter[1]; // Parameter count

                sParams[0] = new SqlParameter();
                sParams[0].SqlDbType = SqlDbType.VarChar;
                sParams[0].ParameterName = "@CategoryID";
                sParams[0].Value = categoryID;

                DataSet dsPlanningReprt = ExecuteDataTable("GetTotalRequiredProductQuantity_S", sParams);

                if (dsPlanningReprt.Tables[0].Columns.Contains("ERROR_NUMBER"))
                {
                    throw new Exception("DataBase Error");
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
                Planning.Models.PlanningReportModel objPlanningReportModel = new Planning.Models.PlanningReportModel();
                objListPlanningReportModel.Add(objPlanningReportModel);
                return objListPlanningReportModel;
            }
            return objListPlanningReportModel;

        }

        private List<PlanningReportModel> GetGridModelForReport(DataTable dtPlanningReprt)
        {
            List<Planning.Models.PlanningReportModel> objListPlanningReportModel = new List<Planning.Models.PlanningReportModel>();
            try
            {
                // Store column header name in List for conditionally showing column sequence in Grid.
                List<int> objLstColumnSequence = new List<int>();
                Dictionary<string, string> objWeekStartDate = new Dictionary<string, string>();
                PlanningReportModel objPlanningReportModel = null;
                TempData["CategoryDataExist"] = false;
                string week = "";
                if (dtPlanningReprt != null)
                {
                    if (dtPlanningReprt.Rows.Count > 0)
                    {
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
                        for (int i = 0; i < dtPlanningReprt.Rows.Count; ++i)
                        {
                            objPlanningReportModel = new PlanningReportModel();
                            //objPlanningReportModel.ModelAssemblyId = Convert.ToInt32(dtPlanningReprt.Rows[i]["ModelAssemblyId"]);
                            //objPlanningReportModel.ModelName = Convert.ToString(dtPlanningReprt.Rows[i]["ModelName"]);
                            //objPlanningReportModel.AssemblyName = Convert.ToString(dtPlanningReprt.Rows[i]["AssemblyName"]);
                            objPlanningReportModel.ItemName = Convert.ToString(dtPlanningReprt.Rows[i]["ItemName"]);
                            objPlanningReportModel.CurrentStock = Convert.ToString(dtPlanningReprt.Rows[i]["CurrentStock"]);

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
                                            TempData["CategoryDataExist"] = true;
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
                else
                {
                    objPlanningReportModel = new Planning.Models.PlanningReportModel();
                    objListPlanningReportModel.Add(objPlanningReportModel);
                    return objListPlanningReportModel;
                }
            }
            catch (Exception ex)
            {
                Planning.Models.PlanningReportModel objPlanningReportModel = new Planning.Models.PlanningReportModel();
                objListPlanningReportModel.Add(objPlanningReportModel);
                return objListPlanningReportModel;
            }
            return objListPlanningReportModel;
        }

        //public ActionResult ProcessPlanning(string categoryId)
        //{
        //    List<PlanningDataInputModel> objListPlanningDataInputModel = new List<PlanningDataInputModel>();
        //    try
        //    {
        //        TempData["subCategoryId"] = categoryId;
        //        if (!string.IsNullOrEmpty(categoryId))
        //        {
        //            if (this.ProcessData(categoryId))
        //            {
        //                Session["categoryId"] = categoryId;
        //                return RedirectToAction("PlanningReport", new RouteValueDictionary(new { controller = "PlanningReport", action = "ItemStocks", id = categoryId }));


        //            }
        //            else
        //            {
        //                PlanningDataInputModel objPlanningDataInputModel = new Planning.Models.PlanningDataInputModel();
        //                objListPlanningDataInputModel.Add(objPlanningDataInputModel);
        //                TempData["Error"] = "Request processing has encountered an unknown error while processing.";
        //                var modeldata = objListPlanningDataInputModel.AsQueryable();
        //                return View("~/Views/Planning/DataEntry.cshtml", modeldata);
        //            }
        //        }
        //        else
        //        {
        //            PlanningDataInputModel objPlanningDataInputModel = new Planning.Models.PlanningDataInputModel();
        //            objListPlanningDataInputModel.Add(objPlanningDataInputModel);
        //            TempData["Error"] = "Request processing has encountered an unknown error while processing.";
        //            var modeldata = objListPlanningDataInputModel.AsQueryable();
        //            return View("~/Views/Planning/DataEntry.cshtml", modeldata);
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        PlanningDataInputModel objPlanningDataInputModel = new Planning.Models.PlanningDataInputModel();
        //        objListPlanningDataInputModel.Add(objPlanningDataInputModel);
        //        TempData["Error"] = "Request processing has encountered an unknown error while processing.";
        //        var modelview = objListPlanningDataInputModel.AsQueryable();
        //        return View("~/Views/Planning/ProductItems.cshtml", modelview);
        //    }
        //    var model = objListPlanningDataInputModel.AsQueryable();
        //    return View("~/Views/Planning/DataEntry.cshtml", model);

        //}

        public bool ProcessData(string categoryID)
        {
            try
            {
                SqlParameter[] sParams = new SqlParameter[1]; // Parameter count
                sParams[0] = new SqlParameter();
                sParams[0].SqlDbType = SqlDbType.VarChar;
                sParams[0].ParameterName = "@CategoryID";
                sParams[0].Value = categoryID;
                DataSet dsProcess = ExecuteDataTable("ExecuteProcessOrder_S", sParams);
                if (dsProcess.Tables.Count >= 1)
                {
                    if (dsProcess.Tables[0].Columns.Contains("ERROR_NUMBER"))
                    {
                        return false;
                    }
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
            return false;

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
                BaseCategoryModel objCategory = new BaseCategoryModel { BaseCategoryId = 0, BaseCategoryName = "Select Category" };
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

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult SubtotalReport(string categoryId)
        {
            List<PlanningReportModel> objListPlanningReportModel = new List<PlanningReportModel>();
            PlanningReportModel objPlanningReportModel = new Planning.Models.PlanningReportModel();
            try
            {
                if (!string.IsNullOrEmpty(categoryId))
                {
                    TempData["subCategoryId"] = categoryId;
                    objListPlanningReportModel = this.GetWeekWiseSubtotalReportGrid(categoryId.ToString().Trim());
                }
                else
                {
                    //TempData["Error"] = "Planning stocks report is not generated for selected category.";
                    objListPlanningReportModel.Add(objPlanningReportModel);

                }
            }
            catch (Exception ex)
            {
                objPlanningReportModel = new Planning.Models.PlanningReportModel();
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
            string baseCategoryId ="";
            try
            {
                if (Request.Form["hdnitem_SubCategory"] != null && Request.Form["hdnitem_BaseCategory"] != null)
                {
                    categoryId = Request.Form["hdnitem_SubCategory"];
                    baseCategoryId = Request.Form["hdnitem_BaseCategory"];
                    TempData["subCategoryId"] = categoryId;
                    TempData["baseCategoryId"] = baseCategoryId;
                    if (!string.IsNullOrEmpty(categoryId))
                    {
                        TempData["subCategoryId"] = categoryId;
                        objListPlanningReportModel = GetWeekWiseSubtotalReportGrid(categoryId.ToString().Trim());
                    }
                    else
                    {
                        TempData["Error"] = "Report not found for selected category.";
                        PlanningReportModel objPlanningReportModel = new Planning.Models.PlanningReportModel();
                        objListPlanningReportModel.Add(objPlanningReportModel);
                    }

                }
            }
            catch (Exception ex)
            {
                PlanningReportModel objPlanningReportModel = new Planning.Models.PlanningReportModel();
                objListPlanningReportModel.Add(objPlanningReportModel);
                TempData["Error"] = "Report not found for selected category.";
            }
            var model = objListPlanningReportModel.AsQueryable();
            return View("~/Views/Planning/SubtotalReport.cshtml", model);
        }


        public List<PlanningReportModel> GetWeekWiseSubtotalReportGrid(string categoryID)
        {
            List<PlanningReportModel> objListPlanningReportModel = new List<PlanningReportModel>();
            try
            {
                SqlParameter[] sParams = new SqlParameter[1]; // Parameter count
                sParams[0] = new SqlParameter();
                sParams[0].SqlDbType = SqlDbType.VarChar;
                sParams[0].ParameterName = "@CategoryID";
                sParams[0].Value = categoryID;
                DataSet dsPlanningData = ExecuteDataTable("GetTotalRequiredProductQuantity_S", sParams);
                TempData["CategoryDataExist"] = false;
                if (dsPlanningData.Tables[0].Columns.Contains("ERROR_NUMBER"))
                {
                    throw new Exception("DataBase Error");
                }
                else if (dsPlanningData.Tables.Count > 0)
                {
                    if (dsPlanningData.Tables[0].Rows.Count >= 1)
                    {
                        objListPlanningReportModel = GetGridModelForSubtotalReport(dsPlanningData.Tables[0]);
                        
                    }
                    else
                    {
                        Planning.Models.PlanningReportModel objPlanningReportModel = new Planning.Models.PlanningReportModel();
                        objListPlanningReportModel.Add(objPlanningReportModel);
                        return objListPlanningReportModel;
                    }

                }
                else
                {
                    Planning.Models.PlanningReportModel objPlanningReportModel = new Planning.Models.PlanningReportModel();
                    objListPlanningReportModel.Add(objPlanningReportModel);
                    return objListPlanningReportModel;
                }

            }
            catch (Exception ex)
            {
                Planning.Models.PlanningReportModel objPlanningReportModel = new Planning.Models.PlanningReportModel();
                objListPlanningReportModel.Add(objPlanningReportModel);
                return objListPlanningReportModel;
            }
            return objListPlanningReportModel;
        }

        private List<PlanningReportModel> GetGridModelForSubtotalReport(DataTable dtPlanningReprt)
        {
            List<Planning.Models.PlanningReportModel> objListPlanningReportModel = new List<Planning.Models.PlanningReportModel>();
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
                                            TempData["CategoryDataExist"] = true;
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
                Planning.Models.PlanningReportModel objPlanningReportModel = new Planning.Models.PlanningReportModel();
                objListPlanningReportModel.Add(objPlanningReportModel);
                return objListPlanningReportModel;
            }
            return objListPlanningReportModel;
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
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandText = storedProcedureName;
                        cmd.CommandTimeout = 0;

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