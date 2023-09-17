function myMacro() {
    var sheet = SpreadsheetApp.getActiveSheet();
    var range = sheet.getActiveRange();
    var row = range.getRow();
    console.log(row);
    
    var column = range.getColumn();
    var cellValue = range.getValue();
    
    if (row && column == 34 ) {
      var htmlOutput = HtmlService.createHtmlOutput(`Street address line 1:<br><input type="text" id="address1" name="address1" value="${cellValue}"><br><br>Street address line 2:<br><input type="text" id="address2" name="address2"><br><br>City:<br><input type="text" id="city" name="city"><br><br>State:<br><input type="text" id="state" name="state"><br><br>Zip:<br><input type="text" id="zip" name="zip"><br><br>Tel:<br><input type="text" id="tel" name="tel"><br><br>Email:<br><input type="text" id="email" name="email"><br><br><button onclick="google.script.run.ShippingAddress(address1.value, address2.value, city.value, state.value, zip.value, tel.value, email.value)">Save</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onclick="google.script.host.close()">Cancel</button><br><br>`);
      htmlOutput.setWidth(300).setHeight(470);
      SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'SHIPPING ADDRESS');
    }
    else if (row && column == 35 ) {
      var htmlOutput = HtmlService.createHtmlOutput(`<label for="address1">Street address line 1:</label><br><input type="text" id="address1" name="address1" value="${cellValue}"><br><br><label for="address2">Street address line 2:</label><br><input type="text" id="address2" name="address2"><br><br><label for="city">City:</label><br><input type="text" id="city" name="city"><br><br><label for="state">State:</label><br><input type="text" id="state" name="state"><br><br><label for="zip">Zip:</label><br><input type="text" id="zip" name="zip"><br><br><label for="tel">Tel:</label><br><input type="text" id="tel" name="tel"><br><br><label for="email">Email:</label><br><input type="text" id="email" name="email"><br><br><input type="checkbox" name="myCheckbox" value="checked"><br><br><button onclick="google.script.run.BillingAddress(address1.value, address2.value, city.value, state.value, zip.value, tel.value, email.value)">Save</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onclick="google.script.host.close()">Cancel</button><br><br>`)
        .setWidth(300)
        .setHeight(500);
      SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'BILLING ADDRESS');
    }
    else if (row && column == 38 ) {
      var htmlOutput = HtmlService.createHtmlOutput(`<label for="cardnumber">Card number:</label><br><input type="text" id="cardnumber" name="cardnumber" value="${cellValue}"><br><br><label for="expdate">Exp date:</label><br><input type="text" id="expdate" name="expdate"><br><br><label for="securitycode">Security code:</label><br><input type="text" id="securitycode" name="securitycode"><br><br><label for="state">State:</label><br><input type="text" id="state" name="state"><br><br><label for="zip">Zip code:</label><br><input type="text" id="zip" name="zip"><br><br><button onclick="google.script.run.CreditCard(cardnumber.value, expdate.value, securitycode.value, state.value, zip.value)">Save</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onclick="google.script.host.close()">Cancel</button><br><br>`)
        .setWidth(300)
        .setHeight(350);
      SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Credit card needs');
    }
  }