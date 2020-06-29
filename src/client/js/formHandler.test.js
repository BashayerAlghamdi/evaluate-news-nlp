// Import the js file to test
import { handleSubmit } from "./formHandler"
 
    test("Testing the handleSubmit() function", () => {
           expect(handleSubmit).toBeInstanceOf(Function);
});