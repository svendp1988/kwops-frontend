import toMock from "../../../../openapi-axios-mock-adapter/output";
import axios from "axios";

describe("API test", () => {

  toMock(axios);

  test('API endpoint', async () => {
    // Make a request to the dummy server
    const response = await axios.get('http://localhost:3100/employees');

    // Check the response
    expect(response.status).toBe(200);
    console.log(response.data);
  });

  test('API post endpoint', async () => {
    // Make a POST request to the dummy server
    const response = await axios.post('http://localhost:3100/employees', {
      lastName: "Doe",
      firstName: "John",
      startDate: "2021-01-01"
    });

    // Check the response
    expect(response.status).toBe(201);
    console.log(response);
  });

});