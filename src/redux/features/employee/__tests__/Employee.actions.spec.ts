import axios from "axios";

describe("API test", () => {

  test("API endpoint", async() => {
    // Make a request to the dummy server
    const response = await axios.get('http://localhost:8082/api/employees')

    // Check the response
    expect(response.status).toBe(200)
    console.log(response.data)
  })

});