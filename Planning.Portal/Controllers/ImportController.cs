using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Data.OleDb;
using Excel;

namespace Planning.Portal.Controllers
{
    public class ImportController : Controller
    {
        // GET: Import
        public ActionResult Index()
        {
            return View("~/Views/Import/InventoryStock.cshtml");
        }
        public ActionResult InventoryStock(HttpPostedFileBase uploadfile)
        {
            if (Session["User"] != null)
            {
                if (uploadfile != null && uploadfile.ContentLength > 0)
                {
                    //ExcelDataReader works on binary excel file
                    Stream stream = uploadfile.InputStream;
                    //We need to written the Interface.
                    IExcelDataReader reader = null;
                    if (uploadfile.FileName.EndsWith(".xls"))
                    {
                        //reads the excel file with .xls extension
                        reader = ExcelReaderFactory.CreateBinaryReader(stream);
                    }
                    else if (uploadfile.FileName.EndsWith(".xlsx"))
                    {
                        //reads excel file with .xlsx extension
                        reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                    }
                    else
                    {
                        //Shows error if uploaded file is not Excel file
                        TempData["Warning"] = " This file format is not supported";
                        return View();
                        //treats the first row of excel file as Coluymn Names
                    }
                    reader.IsFirstRowAsColumnNames = true;

                    //Adding reader data to DataSet()
                    DataSet result = reader.AsDataSet();
                    reader.Close();
                    if (result.Tables[0] != null)
                    {
                        if (result.Tables[0].Rows.Count > 0)
                        {
                            try
                            {
                                string cs = ConfigurationManager.ConnectionStrings["PlanningConnectionString"].ConnectionString;
                                using (SqlConnection sqlConn = new SqlConnection(cs))
                                {
                                    sqlConn.Open();
                                    try
                                    {
                                        string sqlTrunc = "TRUNCATE TABLE ItemRemainingStock";
                                        SqlCommand cmd = new SqlCommand(sqlTrunc, sqlConn);
                                        cmd.ExecuteNonQuery();

                                        sqlTrunc = "TRUNCATE TABLE InventoryStockStatus";
                                        cmd = new SqlCommand(sqlTrunc, sqlConn);
                                        cmd.ExecuteNonQuery();
                                    }
                                    catch (Exception ex)
                                    {
                                        TempData["Error"] = "Unable to truncate existing data in InventoryStockStatus table";
                                        return View();
                                    }
                                    DataTable dtPlanning = result.Tables[0];

                                    foreach (DataRow dr in dtPlanning.Rows)
                                    {
                                        foreach (DataColumn col in dtPlanning.Columns)
                                        {
                                            try
                                            {
                                                dr[col] = Convert.ToString(dr[col]).Trim();
                                            }
                                            catch
                                            {
                                                continue;
                                            }
                                        }
                                    }
                                    dtPlanning.AcceptChanges();

                                    using (SqlBulkCopy sqlbc = new SqlBulkCopy(sqlConn))
                                    {
                                        sqlbc.DestinationTableName = "InventoryStockStatus";
                                        sqlbc.ColumnMappings.Add(1, "ItemName");
                                        sqlbc.ColumnMappings.Add(2, "PrefVendor");
                                        sqlbc.ColumnMappings.Add(3, "ReorderPtMin");
                                        sqlbc.ColumnMappings.Add(4, "ReorderPtMax");
                                        sqlbc.ColumnMappings.Add(5, "OnHand");
                                        sqlbc.ColumnMappings.Add(6, "OnSalesOrder");
                                        sqlbc.ColumnMappings.Add(7, "ForAssemblies");
                                        sqlbc.ColumnMappings.Add(8, "Available");
                                        sqlbc.ColumnMappings.Add(9, "[Order]");
                                        sqlbc.ColumnMappings.Add(10, "OnPO");
                                        sqlbc.ColumnMappings.Add(11, "ReorderQuantity");
                                        sqlbc.ColumnMappings.Add(12, "NextDelivery");
                                        sqlbc.ColumnMappings.Add(13, "SalesWeek");
                                        sqlbc.WriteToServer(dtPlanning);
                                        TempData["Success"] = "Inventory Stock Imported Successfully";
                                    }
                                }
                            }
                            catch (Exception ex)
                            {
                                TempData["Error"] = "Invalid or mismatch data. Correct data and try again";
                                return View();
                            }
                        }
                    }

                }
                else
                {
                    TempData["Warning"] = "Either file type is not valid or File is empty";
                    return View();
                }

                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult POByClass()
        {
            return View();
        }
        [ActionName("POByClass")]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult POByClass(HttpPostedFileBase uploadfile)
        {
            if (Session["User"] != null)
            {

                if (uploadfile != null && uploadfile.ContentLength > 0)
                {
                    //ExcelDataReader works on binary excel file
                    Stream stream = uploadfile.InputStream;
                    //We need to written the Interface.
                    IExcelDataReader reader = null;
                    if (uploadfile.FileName.EndsWith(".xls"))
                    {
                        //reads the excel file with .xls extension
                        reader = ExcelReaderFactory.CreateBinaryReader(stream);
                    }
                    else if (uploadfile.FileName.EndsWith(".xlsx"))
                    {
                        //reads excel file with .xlsx extension
                        reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                    }
                    else
                    {
                        //Shows error if uploaded file is not Excel file
                        TempData["Warning"] = " This file format is not supported";
                        return View();
                    }
                    //treats the first row of excel file as Coluymn Names
                    reader.IsFirstRowAsColumnNames = true;

                    //Adding reader data to DataSet()
                    DataSet result = reader.AsDataSet();
                    reader.Close();
                    if (result.Tables[0] != null)
                    {
                        if (result.Tables[0].Rows.Count > 0)
                        {
                            try
                            {
                                string cs = ConfigurationManager.ConnectionStrings["PlanningConnectionString"].ConnectionString;
                                using (SqlConnection sqlConn = new SqlConnection(cs))
                                {
                                    sqlConn.Open();
                                    try
                                    {
                                        string sqlTrunc = "TRUNCATE TABLE ItemPOCaluculatedByClass";
                                        SqlCommand cmd = new SqlCommand(sqlTrunc, sqlConn);
                                        cmd.ExecuteNonQuery();

                                        sqlTrunc = "TRUNCATE TABLE OpenPOByClass";
                                        cmd = new SqlCommand(sqlTrunc, sqlConn);
                                        cmd.ExecuteNonQuery();
                                    }
                                    catch (Exception ex)
                                    {
                                        TempData["Error"] = "Unable to truncate existing data in OpenPOByClass table";
                                        return View();

                                    }
                                    DataTable dtOpenPoByClass = new DataTable();

                                    dtOpenPoByClass.Columns.Add("ItemName");
                                    dtOpenPoByClass.Columns.Add("Class");
                                    dtOpenPoByClass.Columns.Add("Backordered");


                                    DataTable dtTempOpenPOByClass = result.Tables[0];

                                    for (int i = 1; i < dtTempOpenPOByClass.Rows.Count; ++i)
                                    {
                                        if (Convert.ToString(dtTempOpenPOByClass.Rows[i][1]).Trim() != "")
                                        {
                                            DataRow dr = dtOpenPoByClass.NewRow();
                                            dr[0] = Convert.ToString(dtTempOpenPOByClass.Rows[i][1]).Trim();
                                            dr[1] = Convert.ToString(dtTempOpenPOByClass.Rows[i][2]).Trim();
                                            dr[2] = Convert.ToString(dtTempOpenPOByClass.Rows[i][6]).Trim();
                                            dtOpenPoByClass.Rows.InsertAt(dr, dtOpenPoByClass.Rows.Count);
                                            dtOpenPoByClass.AcceptChanges();
                                        }


                                    }
                                    using (SqlBulkCopy sqlbc = new SqlBulkCopy(sqlConn))
                                    {
                                        sqlbc.DestinationTableName = "OpenPOByClass";
                                        sqlbc.ColumnMappings.Add(0, "ItemName");
                                        sqlbc.ColumnMappings.Add(1, "Class");
                                        sqlbc.ColumnMappings.Add(2, "Backordered");
                                        sqlbc.WriteToServer(dtOpenPoByClass);
                                        TempData["Success"] = "PO By Class Imported Successfully";
                                    }
                                }
                            }
                            catch (Exception ex)
                            {
                                TempData["Error"] = "Invalid or mismatch data. Correct data and try again";
                                return View();
                            }
                        }
                    }

                }
                else
                {
                    TempData["Warning"] = "Either file type is not valid or File is empty";
                    return View();
                }

                return View();
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }


        }
    }

}