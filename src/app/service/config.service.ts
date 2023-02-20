import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {HitsModel} from '../model/hits.model';
import {Subject} from 'rxjs';
import {CommentModel} from '../model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  loader$: Subject<boolean> = new Subject<boolean>();
  constructor(private httpClient: HttpClient) { }

  getNews(page: number, tags: string = 'front_page') {
    return this.httpClient.get<any>(`${environment.apiUrl}search_by_date?page=${page}&tags=${tags}`).pipe(
      map((data: any) => {
        let hitsList: HitsModel[] = data['hits'];
        return hitsList.map((hitApi: any) => {
          let hit: HitsModel = {
            title: hitApi.title,
            id: hitApi.objectID,
            commentsCount: hitApi.num_comments,
            dateCreate: hitApi.created_at_i,
            author: hitApi.author,
            rating: hitApi.points,
            url: hitApi.url,
            tags: hitApi._tags.map((hitApiTags: any) => {
              if((hitApiTags === 'story') || (hitApiTags === 'poll') || (hitApiTags === 'show_hn') || (hitApiTags === 'ask_hn') || (hitApiTags === 'front_page')){
                return hitApiTags;
              }
            }).filter(Boolean)
          };
          return hit;
        });
      })
    );
  }
  getCommentByHit(id: string){
    return this.httpClient.get<any>(`${environment.apiUrl}search?tags=comment,story_${id}`).pipe(
      map((data: any) => {
        let commentList: CommentModel[] = data['hits'];
        return commentList.map((commentApi: any) => {
          let comment: CommentModel = {
            id: commentApi.objectID,
            parent: commentApi.parent_id,
            author: commentApi.author,
            dateCreate: commentApi.created_at_i,
            text: commentApi.comment_text,
            child: []
          };
          return comment;
        });
      })
    );
  }

  openLoader(){
    this.loader$.next(true);
  }

  closeLoader(){
    this.loader$.next(false);
  }

  getHit(id: string){
      return this.httpClient.get<any>(`${environment.apiUrl}items/${id}`).pipe(
        map((hitApi: any) => {
          let hit: HitsModel = {
            title: hitApi.title,
            id: hitApi.objectID,
            commentsCount: hitApi.num_comments,
            dateCreate: hitApi.created_at_i,
            author: hitApi.author,
            rating: hitApi.points,
            url: hitApi.url,
          };
          return hit;
        })
      );
  }

  getCommentToComment(comments: CommentModel[]){
    for(let i = 0; i < comments.length; i++){
      comments[i].child = this.getCommentToParent(comments, comments[i]);
    }
    return comments;
  }

  getCommentToParent(comments: CommentModel[], parent: CommentModel){
    let cield = [];
    for(let i = 0; i < comments.length; i++){
      if(comments[i].parent === parent.parent && comments[i].id !== parent.id){
        cield.push(comments[i]);
        comments.splice(i, 1);
        i--;
      }
    }
    return cield;
  }
}
