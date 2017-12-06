import { Pipe, PipeTransform } from '@angular/core'

@Pipe ({
name: 'search'
})
export class SearchPipe implements PipeTransform{
    transform(pipeData, pipeModifier){
        if (pipeData==null){
        return null;
        }
        return pipeData.filter((eachItem)=> {
        return eachItem['name'].toLowerCase().includes(pipeModifier.toLowerCase()) ||
        eachItem['venue'].toLowerCase().includes(pipeModifier.toLowerCase()); 
        });
    }
}

@Pipe({ name: 'values',  pure: false })
export class ValuesPipe implements PipeTransform {

  transform(value: any, args: any[] = null): any {
    if (value==null){
        return null;
        }
    return Object.keys(value).map(key => value[key]);
  }
}