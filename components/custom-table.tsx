import { Table, TableProps } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import { fetchTableData } from "../hooks/connectHttp";

export default function CustomTable(props: { columns: any[]; url: string }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { isLoading, data } = useQuery(
    [props.url, page, limit],
    fetchTableData.bind(null, {
      url: `${props.url}?page=${page}&limit=${limit}`,
      method: "get",
    })
  );
  const [selectedRowsCount, setSelectedRowsCount] = useState(0);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setSelectedRowsCount(selectedRowKeys.length);
      console.log(selectedRowsCount);
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
      <div>actions</div>
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
