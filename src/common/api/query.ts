/**
 * Parameters used to narrow down a query,
 * passed into an API request function
 */
export interface QueryParams<
  I extends string = string,
  M extends string = string
> {
  /**
   * Optional fields to expand.
   * Injects into an 'includes' field at root of document return
   */
  include?: I[];

  /**
   * Optional related data not included in the doc.
   * Injected into the 'meta' field of an individual resource
   */
  meta?: M[];

  /**
   * Specify a list of properties to sort by. Signify descending with a '-',
   * i.e. ['-id']
   */
  sort?: string[];

  /**
   * Filter by specific params, i.e. {name: 'Website'}
   */
  filter?: { [key: string]: string | string[] };

  /**
   * Pagination. Specify number of resources for the 'page' and which
   * page number you wish to return.
   */
  page?: {
    number: number;
    size: number;
  };
}

/**
 * Format query parameters into a URL string for the API call
 * @param q QueryParams object
 */
export function formatParams(q: QueryParams | undefined) {
  if (!q) {
    return "";
  }

  const result = {};
  function recurse(cur: any, prop: any) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      result[prop] = cur.join(",");
    } else {
      let isEmpty = true;
      for (const p in cur) {
        if (!cur.hasOwnProperty(p)) {
          continue;
        }
        isEmpty = false;
        recurse(cur[p], prop ? `${prop}[${p}]` : p);
      }
      if (isEmpty && prop) {
        result[prop] = {};
      }
    }
  }
  recurse(q, "");

  return Object.keys(result)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(result[k])}`)
    .join("&");
}
