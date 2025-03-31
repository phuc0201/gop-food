import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable, switchMap } from 'rxjs';
import { SystemConstant } from '../constants/system.constant';
import { URLConstant } from '../constants/url.constant';
import { ILoginDTO, SignupDTO } from '../models/auth/auth.model';
import { IToken } from '../models/common/response-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = inject(Auth);
  private baseURL: string = URLConstant.API.ENDPOINT;
  private requireUserLogin = new BehaviorSubject<boolean>(false);
  requireLogin$ = this.requireUserLogin.asObservable();

  private loginStatus = new BehaviorSubject<boolean>(false);
  currLoginStatus$ = this.loginStatus.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    if (!this.isLogged()) {
      sessionStorage.clear();
    }
    else {
      this.loginStatus.next(true);
    }
  }

  changeLoginStatus(status: boolean = false): void {
    this.loginStatus.next(status);
  }

  doLogin(accCred: ILoginDTO): Observable<IToken> {
    return this.http.post<IToken>(this.baseURL + URLConstant.API.AUTH.SIGNIN, accCred);
  }

  doSignup(signupDTO: SignupDTO) {
    return this.http.post<any>(this.baseURL + URLConstant.API.AUTH.SIGNUP, signupDTO, { observe: 'response' });
  }

  isLogged(): boolean {
    return this.getToken() != null;
  }

  promptLogin(status: boolean = true) {
    this.requireUserLogin.next(status);
  }

  async doLogout(): Promise<void> {
    this.changeLoginStatus(false);
    await this.clearStorage();
    this.router.navigate(['/']);
  }

  clearStorage(): Promise<void> {
    return new Promise((resolve) => {
      localStorage.removeItem(SystemConstant.CURRENT_INFO);
      sessionStorage.removeItem(SystemConstant.CURRENT_PROFILE);
      resolve();
    });
  }

  setToken(token: IToken): void {
    localStorage.setItem(
      SystemConstant.CURRENT_INFO,
      JSON.stringify(token),
    );
  }

  getToken(): IToken | null {
    const tmp = localStorage.getItem(SystemConstant.CURRENT_INFO);
    return tmp ? JSON.parse(tmp) : null;
  }

  generateRefreshToken(): Observable<IToken> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()?.refreshToken}`,
    });
    return this.http.post<IToken>(this.baseURL + URLConstant.API.AUTH.REFRESH, { headers: header });
  }

  loginWithGoogle(): Observable<IToken> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      switchMap(async (result) => {
        const token = result.user ? await result.user.getIdToken() : null;
        if (!token) throw new Error('Failed to retrieve token from Google Sign-In.');
        return this.http.post<IToken>(this.baseURL + '/auth/customer/google-login', { token });
      }),
      switchMap((obs) => obs)
    );
  }
}

