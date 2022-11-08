export default interface RequestConfigInterface {
    url: string;
    method: "get" | "post" | "delete" | "patch" | "put";
    body?: any;
    headers?: any;
  }
  