using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace Planning.DAL
{
    public abstract class DataAccessBase : IDisposable
    {
        #region Fields
        private SqlConnection connection = null;
        #endregion

        #region Properties
        public SqlConnection Connection
        {
            get
            {

                return this.connection;
            }
            set
            {
                this.connection = value;
            }
        }
        #endregion

        #region Constructors
        public DataAccessBase()
        {
            var connection = ConfigurationManager.ConnectionStrings["SimpleDataAccessConnection"];
            if (connection != null)
            {
                this.connection = new SqlConnection(connection.ConnectionString);
            }
        }

        public DataAccessBase(string connectionString)
        {
            this.connection = new SqlConnection(connectionString);
        }

        public DataAccessBase(SqlConnection connection)
        {
            this.connection = connection;
        }
        #endregion

        #region ADO operations

        /// <summary>
        /// Returns SqlDataReader for stored procedure with optional paramets list
        /// </summary>
        /// <param name="procedureName"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public SqlDataReader ExecuteReader(string procedureName, IDictionary<string, IConvertible> parameters = null)
        {
            return this.GetCommand(procedureName, parameters).ExecuteReader();
        }

        /// <summary>
        /// Returns DataTable for stored procedure with optional paramets list
        /// </summary>
        /// <param name="procedureName"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataTable ExecuteDataTable(string procedureName, IDictionary<string, IConvertible> parameters = null)
        {
            DataTable dataTable = new DataTable();
            this.GetAdapter(procedureName, parameters).Fill(dataTable);
            return dataTable;
        }

        /// <summary>
        /// Returns DataSet for stored procedure with optional paramets list
        /// </summary>
        /// <param name="procedureName"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public DataSet ExecuteDataSet(string procedureName, IDictionary<string, IConvertible> parameters = null)
        {
            DataSet dataSet = new DataSet();
            this.GetAdapter(procedureName, parameters).Fill(dataSet);
            return dataSet;
        }

        #region table truncate
        public int TruncateTable(string tableName)
        {
            try
            {
                string sqlTrunc = "TRUNCATE TABLE " + tableName;
                SqlCommand cmd = new SqlCommand(sqlTrunc);
                if (connection.State != ConnectionState.Open)
                {
                    connection.Open();
                }
                cmd.Connection = this.connection;

                return cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                return 0;
            }
            return 0;
        }
        #endregion
        #region table truncate
        public int InsertBulkData(SqlBulkCopy sqlbc, DataTable dtWritableData)
        {
            try
            {
                if (connection.State != ConnectionState.Open)
                {
                    connection.Open();
                }
                using (SqlBulkCopy sqlbulk = new SqlBulkCopy(connection))
                {
                    sqlbulk.WriteToServer(dtWritableData);
                    return 1;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
            return 0;
        }
        #endregion
        
        #region updateCommand
        public int UpdateData(string strUpdateQuery)
        {
            try
            {
                SqlCommand cmd = new SqlCommand(strUpdateQuery);
                if (connection.State != ConnectionState.Open)
                {
                    connection.Open();
                }
                cmd.Connection = this.connection;

                return cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                return 0;
            }
            return 0;
        }
        #endregion


        #region Command preparing methods

        /// <summary>
        /// Creates SqlAdapter instance for the stored procedure with optional paramets
        /// </summary>
        /// <param name="procedureName"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        private SqlDataAdapter GetAdapter(string procedureName, IEnumerable<KeyValuePair<string, IConvertible>> parameters = null)
        {
            return new SqlDataAdapter(this.GetCommand(procedureName, parameters));
        }

        /// <summary>
        /// Creates SqlAdapter instance for the command
        /// </summary>
        /// <param name="command"></param>
        /// <returns></returns>
        private SqlDataAdapter GetAdapter(SqlCommand command)
        {
            return new SqlDataAdapter(command);
        }

        /// <summary>
        /// Prepares SqlCommand for stored procedure with oprional parameters list
        /// </summary>
        /// <param name="procedureName"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        private SqlCommand GetCommand(string procedureName, IEnumerable<KeyValuePair<string, IConvertible>> parameters = null)
        {
            SqlCommand command = new SqlCommand(procedureName);
            if (connection.State != ConnectionState.Open)
            {
                connection.Open();
            }
            command.Connection = this.connection;
            if (parameters != null && parameters.Any())
            {
                foreach (var param in parameters)
                {
                    command.Parameters.Add(new SqlParameter(param.Key, param.Value));
                }
            }
            return command;
        }

        #endregion

        #endregion

        #region IDisposable implementation

        /// <summary>
        /// Dispose DataAccessLayer instance and closes database connection
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (this.connection != null)
                {
                    this.connection.Close();
                    this.connection.Dispose();
                }
            }
        }

        #endregion
    }
}
