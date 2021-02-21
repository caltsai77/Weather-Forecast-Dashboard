package sample;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.chart.PieChart;
import javafx.scene.control.*;

public class S1Cont {

    //Below are the connections for all of the different items in scene builder to the Main file to generate them

    @FXML
    private Label TownName;

    @FXML
    private Label RealTemp;

    @FXML
    private Label FeelsTemps;

    @FXML
    private Label Condition;



    //update method changes the values in the array of inputs based on new data from the user.
    public void update(ActionEvent event){

        Main.dataPull();
        TownName.setText(Main.town);
        RealTemp.setText(Main.temp+"°");
        FeelsTemps.setText("Feels like "+Main.feelTemp+"°");
        Condition.setText(Main.condt);

    }

    public void back(ActionEvent event){
        Main.set_pane(0);
    }

}