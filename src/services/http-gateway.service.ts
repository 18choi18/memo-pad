import queryString from 'query-string';

const defaultOption: RequestInit = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store',
    Pragma: 'no-cache',
  },
};

interface RequestOptions extends RequestInit {
  search?: any;
}

class HttpGateway {
  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetch(...this.createRequest(url, 'GET', null, options))
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  post<T>(url: string, body: BodyInit | null, options?: RequestOptions): Promise<T> {
    return fetch(...this.createRequest(url, 'POST', body, options))
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  put<T>(url: string, body: BodyInit | null, options?: RequestOptions): Promise<T> {
    return fetch(...this.createRequest(url, 'PUT', body, options))
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  delete<T>(url: string, body: BodyInit | null, options?: RequestOptions): Promise<T> {
    return fetch(...this.createRequest(url, 'DELETE', body, options))
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  private createRequest(
    url: string,
    method: string,
    body: BodyInit | null,
    options: RequestOptions = {},
  ): [string, RequestInit] {
    const httpUrl = queryString.stringifyUrl(
      { url: `${process.env.API_SERVER}${url}`, query: options.search },
      {
        arrayFormat: 'none',
        skipEmptyString: true,
      },
    );
    const httpOptions = { ...defaultOption, ...options, method };
    if (body) httpOptions.body = body;

    return [httpUrl, httpOptions];
  }

  private handleResponse(response: Response) {
    if (!response.ok) {
      return Promise.reject(response);
    }
    return response.json();
  }

  private handleError(err: any) {
    // Send error to log server...

    return Promise.reject(err);
  }
}

export const httpGateway = new HttpGateway();
