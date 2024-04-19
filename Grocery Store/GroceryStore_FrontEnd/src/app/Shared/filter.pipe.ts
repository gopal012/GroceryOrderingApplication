import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  
  //Used to filter data on behalf of user search input
  transform(value: any[],filterString:string,propName:string): any[] {
    const result:any=[]
    if(!value || filterString == '' || propName == ''){
      return value;
    }
    value.forEach((a:any)=>{
      if(a[propName].trim().toLowerCase().includes(filterString.toLowerCase())){
        result.push(a);
      }
    })
    return result;
  }
}
