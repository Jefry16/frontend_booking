import { Table, TableProps } from "antd";
import { useState, useEffect } from "react";
import useHttp from "../hooks/useHttp";

export default function CustomTable(props: { columns: any[] }) {
  const [rows, setRows] = useState([]);
  const { error, isLoading, sendRequest } = useHttp();
  const [meta, setMeta] = useState<{
    currentPage: number;
    itemsCount: number;
    pages: number;
  }>();
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  function fetchdata(page: number = 1, limit: number = 10) {
    sendRequest(
      { url: `/providers?page=${page}&limit=${limit}`, method: "get" },
      (backendData: any) => {
        setRows(
          backendData.data.map((data: any) => ({ ...data, key: data.id }))
        );
        setMeta(backendData.meta);
      }
    );
  }
  const onChange: TableProps<{}>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log(filters, pagination);
    if (extra.action === "paginate") {
      fetchdata(pagination.current, pagination.pageSize);
    }
  };

  useEffect(() => {
    console.log(1);
    fetchdata();
  }, []);

  return (
    <Table
      pagination={{
        total: meta?.itemsCount,
        showSizeChanger: true,
      }}
      loading={isLoading}
      columns={props.columns}
      dataSource={rows}
      rowSelection={rowSelection}
      onChange={onChange}
    ></Table>
  );
}
