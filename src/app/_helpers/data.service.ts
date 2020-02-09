import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  candidateObj = {
    candidates: [
      {
        id: 1,
        candidateId: 1,
        name: 'Himan',
        email: 'himan@abc.xyz',
        phone: 1234567890,
        experience: 4.5,
        photo: 'assets/profile_pic_default.jpg',
        github: 'https://www.github.com/him123'
      }
    ]
  };

  dataChangeSubject: Subject<any>;
  constructor(private http: HttpClient) {
    let data = localStorage.getItem('candidatesData');
    if (!data) {
      let candidatesData = this.candidateObj['candidates'];
      localStorage.setItem('candidatesData', JSON.stringify(candidatesData));
    }
  }

  getData() {
    let data = localStorage.getItem('candidatesData');
    if (data) return JSON.parse(data);
    else return JSON.parse('');
  }

  getDataById(id) {
    let data = JSON.parse(localStorage.getItem('candidatesData'));
    let output;
    data.forEach(el => {
      if (el['id'] == id) {
        output = el;
      }
    });
    return output;
  }

  saveData(value: any) {
    if (value) {
      let data = JSON.parse(localStorage.getItem('candidatesData'));
      let id = data.length + 1;
      data.push(this.getModifiedObj(value, id));
      localStorage.setItem('candidatesData', JSON.stringify(data));
    }
  }

  getModifiedObj(value, id) {
    let phone = value['code'] + value['phone'];
    return {
      id: id,
      candidateId: id,
      name: value['name'],
      email: value['email'],
      phone: phone,
      experience: value['experience'],
      photo: 'assets/profile_pic_default.jpg',
      github: value['github']
    };
  }
}