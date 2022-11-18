import { Table, TableProps } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { fetchTableData } from "../hooks/connectHttp";
import TableActions from "./table-actions";
import Action from "../interfaces/table-action.interface";

export default function CustomTable(props: {
  columns: any[];
  url: string;
  actions: Action[];
}) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { isLoading, data } = useQuery(
    [props.url, page, limit],
    fetchTableData.bind(null, {
      url: `${props.url}?page=${page}&limit=${limit}`,
      method: "get",
    })
  );
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setSelectedIds(selectedRows.map((row) => row.id));
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  const onChange: TableProps<{}>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra.action === "paginate") {
      setPage(pagination.current || 1);
      setLimit(pagination.pageSize || 10);
    }
  };

  return (
    <>
      {selectedIds.length > 0 && (
        <TableActions ids={selectedIds} actions={props.actions} />
      )}
      <Table
        loading={isLoading}
        pagination={{
          total: data?.meta?.itemsCount,
          showSizeChanger: true,
        }}
        columns={props.columns}
        dataSource={data?.data}
        rowSelection={rowSelection}
        rowKey={(record: any) => record.id}
        onChange={onChange}
      ></Table>
    </>
  );
}
