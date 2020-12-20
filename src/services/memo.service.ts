/*
    If you need synchronization function,
    use http-gateway to store and retrieve data in the api server.
*/
import Memo from '../components/Memo/Memo';
import { httpGateway } from './http-gateway.service';

class MemoService {
  getMemos(): Promise<Memo[]> {
    const savedMemoSerial = window.localStorage.getItem('memos');
    return Promise.resolve(savedMemoSerial ? JSON.parse(savedMemoSerial) : []);

    // return httpGateway.get('/memo');
  }

  saveMemos(memos: Memo[]) {
    try {
      window.localStorage.setItem('memos', JSON.stringify(memos));
      return Promise.resolve();
    } catch {
      return Promise.reject(new Error('Fail to save memos'));
    }

    // return httpGateway.post('/memo');
  }
}

export const memoService = new MemoService();
