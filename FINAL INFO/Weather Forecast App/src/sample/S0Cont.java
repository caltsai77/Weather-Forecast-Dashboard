package sample;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Alert.*;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;

public class S0Cont {
    @FXML
    private Button continueBtn;

    @FXML
    private TextField zipCode;

    public void nextPage(ActionEvent event){
        if(zipCode.getText().trim().equals("") || zipCode.getText().matches("^[0-9]*$") ==false ){
            Validate();
        }else{
            zipCodeBtn();
            Main.set_pane(1);

        }
    }

    public void zipCodeBtn(){
        if (zipCode.getText().trim().equals("") || zipCode.getText().matches("^[0-9]*$") ==false ){
            Validate();
        }else{
            Main.setZip(Integer.parseInt(zipCode.getText()));
        }
    }

    public void Validate(){
        Alert alert = new Alert(AlertType.WARNING);
        alert.setTitle("Validate Input");
        alert.setHeaderText(null);
        alert.setContentText("Please enter a number in the field");
        alert.showAndWait();
    }
}
