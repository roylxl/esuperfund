using System;
using System.Configuration;
using System.IO;
using System.Web;
namespace ESUPER.Common
{
    public class Log
    {
        private static readonly string Path = ConfigurationManager.AppSettings["log"];
        private static readonly string FileLogPath = ConfigurationManager.AppSettings["FileLog"];
        public static void WriteLog(string str)
        {
            string rootPath = HttpContext.Current.Server.MapPath(Path);
            //check the directory isexist
            if (!Directory.Exists(rootPath))
            {
                Directory.CreateDirectory(rootPath);
            }
            string filePath = rootPath + DateTime.Now.ToString("yyyyMMdd") + ".txt";

            FileStream fs;
            if (!File.Exists(filePath))
            {
                fs = File.Create(filePath);
            }
            else
            {
                fs = new FileStream(filePath, FileMode.Append);
            }
            StreamWriter sw = new StreamWriter(fs);
            sw.WriteLine(str);
            sw.Flush();
            sw.Close();
            fs.Close();
            CleanLog();
        }
       
        public static void CleanLog()
        {
            DirectoryInfo dinfo = new DirectoryInfo(HttpContext.Current.Server.MapPath(Path));

            FileInfo[] listfile = dinfo.GetFiles();
            //Retained for 15 days,the remain files move to historylog
            if (listfile.Length > 15)
            {
                string historyDir = HttpContext.Current.Server.MapPath(Path + "historylog/");
                DateTime dtnow = DateTime.Parse(DateTime.Now.ToShortDateString());
                string filename;
                DateTime filedtime;
                foreach (FileInfo finfo in listfile)
                {
                    filename = finfo.Name.Substring(0, finfo.Name.IndexOf('.'));
                    filedtime = DateTime.ParseExact(filename, "yyyyMMdd", null).AddDays(15);
                    if (filedtime <= dtnow)
                    {
                        if (!Directory.Exists(historyDir))
                        {
                            Directory.CreateDirectory(historyDir);
                        }

                        finfo.MoveTo(historyDir + finfo.Name);
                    }
                }
            }
        }

        /// <summary>
        /// Add log while upload file(s)
        /// </summary>
        /// <param name="str"></param>
        public static void WriteUploadFileLog(string str)
        {
            string rootPath = HttpContext.Current.Server.MapPath(FileLogPath);
            //check the directory isexist
            if (!Directory.Exists(rootPath))
            {
                Directory.CreateDirectory(rootPath);
            }
            string filePath = rootPath + DateTime.Now.ToString("yyyyMMdd") + ".txt";
            str = "Time:"+DateTime.Now.ToString("yyyyMMddHHmmss") + "#" + str;
            FileStream fs;
            if (!File.Exists(filePath))
            {
                fs = File.Create(filePath);
            }
            else
            {
                fs = new FileStream(filePath, FileMode.Append);
            }
            StreamWriter sw = new StreamWriter(fs);
            sw.WriteLine(str);
            sw.Flush();
            sw.Close();
            fs.Close();
            //CleanLog();
        }
    }
}
