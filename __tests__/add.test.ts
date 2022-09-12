import { add } from "../src/utils/add"
// import {it,expect } from "vitest"
it('should add array of numbers',()=>{
    const numbers=[1,3,10]
    const a:number[]=[5,3];

    const result=add(a)

    const expectedResult=8
    expect(result).toBe(expectedResult);
})