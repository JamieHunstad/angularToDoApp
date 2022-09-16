import { Injectable } from '@angular/core';
import { todoModel } from '../shared/todo.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  subject = new Subject<todoModel[]>();

  constructor() {
   }

  todoArray: todoModel[] = []



  getTodoArray(){
    return this.todoArray
  }

  addItem(todo: any){
    this.todoArray.push({
      content: todo
    });
    this.subject.next(this.todoArray)
  }
  
  deleteItem(itemId: number){
    this.todoArray =  this.todoArray.filter(function(todo,todoId){
     return itemId !== todoId
    })
    this.subject.next(this.todoArray)
  }


}
