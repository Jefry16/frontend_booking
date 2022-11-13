import { Table, TableProps } from "antd";
import { useState, useEffect } from "react";
import useHttp from "../hooks/useHttp";

export default function CustomTable(props: { columns: any[]; url: string }) {
  const [rows, setRows] = useState([]);
  const { error, isLoading, sendRequest } = useHttp();
  const [meta, setMeta] = useState<{
    currentPage: number;
    itemsCount: number;
    pages: number;
  }>();
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

  function fetchdata(page: number = 1, limit: number = 10) {
    sendRequest(
      { url: `/${props.url}?page=${page}&limit=${limit}`, method: "get" },
      (backendData: any) => {
        setRows(backendData.data);
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
    if (extra.action === "paginate") {
      fetchdata(pagination.current, pagination.pageSize);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <div>actions</div>
      <Table
        pagination={{
          total: meta?.itemsCount,
          showSizeChanger: true,
        }}
        loading={isLoading}
        columns={props.columns}
        dataSource={rows}
        rowSelection={rowSelection}
        rowKey={(record: any) => record.id}
        onChange={onChange}
      ></Table>
    </>
  );
}
