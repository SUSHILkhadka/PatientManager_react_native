import {expect, it} from "vitest"
import { add } from "./add"
it('should add array of numbers',()=>{
    const numbers=[1,3,10]

    const result=add(numbers)

    const expectedResult=15
    expect(result).toBe(expectedResult);
})