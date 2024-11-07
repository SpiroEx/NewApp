import { FHPagination } from "@/hooks/useFHPagination";
import ChevronLeft from "../../../components/svg/icon/ChevronLeft";
import ChevronRight from "../../../components/svg/icon/ChevronRight";
import { twMerge } from "tailwind-merge";

interface LogsTableProps<T extends { id: string }> {
  headers: string[];
  data: any[][];
  legends?: [string, string][];
  pagination: FHPagination<T>;
  classNameHeader: string;
  classNameBody: string;
}

const LogsTable: React.FC<LogsTableProps<any>> = ({
  headers,
  data,
  legends,
  pagination,
  classNameHeader,
  classNameBody,
}) => {
  const columns = headers.map((header, i) => [
    header,
    ...data.map((row) => row[i]),
  ]);

  return (
    <div className="csc-4 wf">
      <p className="t76">Logs</p>

      {/*//! TABLE */}
      <div className="csc-4 bg-log_gray rounded-2xl py-4 px-6">
        <div
          className="rss-4 wf"
          style={{
            maxWidth: "90vw",
            overflowX: "auto",
          }}
        >
          {columns.map((data, i) => {
            const header = data[0];
            const restOfData = data.slice(1);

            return (
              <div key={i} className="csc-2">
                <p className={twMerge(classNameHeader)}>{header}</p>
                {restOfData.map((d, i) => (
                  <p
                    key={i}
                    className={twMerge(
                      "truncate whitespace-nowrap",
                      classNameBody
                    )}
                  >
                    {d}
                  </p>
                ))}
              </div>
            );
          })}
        </div>

        {/* //! < 1 > */}
        <div className="flex gap-4 items-center mt-2 m-auto pb-2">
          <ChevronLeft
            color="#FFF"
            onClick={pagination.prev}
            disabled={!pagination.hasPrev || pagination.loading}
          />
          <p className="text-text_dark">{pagination.pageNum}</p>
          <ChevronRight
            color="#FFF"
            onClick={pagination.next}
            disabled={!pagination.hasNext || pagination.loading}
          />
        </div>
      </div>

      {/*//! LEGEND */}
      <div className="css-4 mt-4">
        <p className="t46">Legend</p>

        <div className="grid grid-cols-2 gap-3 px-2">
          {legends?.map(([abbr, full], i) => (
            <div key={i} className="flex gap-2 items-center">
              <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
              <p className="t26">{abbr}:</p>
              <p className="t22">{full}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogsTable;

//! SAMPLE ------------
{
  /* <LogsTable
          headers={["Date", "N", "P", "K", "pH", "SM", "T", "EC"]}
          data={logsPagination.data.map((log) => [
            DateHelper.epochMsToLogDate(Number(log.id)),
            log.n,
            log.p,
            log.k,
            log.ph,
            log.sm,
            log.temp,
            log.ec,
          ])}
          legends={[
            ["N", "Nitrogen"],
            ["P", "Phosphorus"],
            ["K", "Potassium"],
            ["SM", "Soil Moisture"],
            ["T", "Temperature"],
            ["EC", "Electrical Conductivity"],
          ]}
          pagination={logsPagination}
        /> */
}
