using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Planning.Models
{
    public class LoginModel
    {
        public string userName { get; set; }
        public string password { get; set; }
        public string userType { get; set; }
    }

    //#region Used to initialize user details upon login
    //public class CustomerInformationModel
    //{
    //    public int CustomerId { get; set; }
    //    public string UserType { get; set; }
    //    public string CustomerName { get; set; }
    //    public string UserName { get; set; }
    //    public int UserId { get; set; }
    //    public int CustomerUserID { get; set; }
    //    public int IPSUserID { get; set; }
    //    public int RoleId { get; set; }
    //    public List<CustomerViewModel> Customerlist { get; set; }

    //    public CustomerInformationModel(int customerId, string userType, string customerName, string userName, int userId, int customerUserId, int ipsUserId, int roleId, List<CustomerViewModel> customerlist)
    //    {
    //        CustomerId = customerId;
    //        UserType = userType;
    //        CustomerName = customerName;
    //        UserName = userName;
    //        UserId = userId;
    //        CustomerUserID = customerUserId;
    //        IPSUserID = ipsUserId;
    //        RoleId = roleId;
    //        Customerlist = customerlist;

    //        HttpContext.Current.Session["CustID"] = customerId;
    //    }



    //}
    //#endregion
}