## Task: Implement Search Functionality with Optimizations and Testing

1. **Search Input**:  
   - Implement the search functionality by calling the API with a search parameter based on the user's input.

2. **Optimized API Requests**:  
   - Ensure that the API request is triggered only after the user has finished typing, avoiding unnecessary requests with each keystroke.

3. **Loading State**:  
   - Display a loading indicator while the data is being fetched from the API.

4. **Error Handling**:  
   - Gracefully handle any errors during the API request and display an appropriate error message if the request fails.

5. **Edge Case Handling**:  
   - If the user changes the search input before a request completes, cancel any pending requests to prevent unnecessary API calls.

6. **Testing**:  
   - Write tests for the implemented functionality. This should include:
     - Verifying that the API call is triggered correctly.
     - Checking that the loading state appears while data is being fetched.
     - Ensuring the error handling works as expected.
     - Validating that requests are cancelled when the search input changes.
