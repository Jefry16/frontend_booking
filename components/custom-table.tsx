import { Table, TableProps } from "antd";

export default function CustomTable(props: {
  columns: any[];
  dataSource: any[] | undefined;
  loading: boolean;
}) {
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
  const onChange: TableProps<{}>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {};
  return (
    <Table
      loading={props.loading}
      columns={props.columns}
      dataSource={props.dataSource}
      rowSelection={rowSelection}
      onChange={onChange}
    ></Table>
  );
}
