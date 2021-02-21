package sample;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import javafx.application.Application;
import javafx.scene.layout.AnchorPane;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.*;
import static java.util.stream.Collectors.*;

public class Main extends Application {

    static AnchorPane root;
    static List<AnchorPane> anchor = new ArrayList<AnchorPane>();
    private static int idx_cur = 0;
    public static int zipCode = 0;
    public static String town="";
    public static String temp="";
    public static String condt="";
    public static String feelTemp="";

    @Override
    public void start(Stage primaryStage) throws Exception {
        root = (AnchorPane) FXMLLoader.load(getClass().getResource("anchor.fxml"));// creates root based off of S1.fxml file. This creates the GUI from scene builder

        anchor.add((AnchorPane) FXMLLoader.load(getClass().getResource("S0.fxml")));
        anchor.add((AnchorPane) FXMLLoader.load(getClass().getResource("S1.fxml")));

        root.getChildren().add(anchor.get(0));
        Scene scene = new Scene(root);

        primaryStage.setTitle("Weather Forecast");
        primaryStage.setScene(scene);
        primaryStage.show();
    }   //WORKING

    public static void set_pane(int idx) {
        root.getChildren().remove(anchor.get(idx_cur));
        root.getChildren().add(anchor.get(idx));
        idx_cur = idx;
    }   //WORKING

    public static AnchorPane get_pane(int idx) {
        return anchor.get(idx);
    }   //WORKING

    public static int getZip() {
        return zipCode;
    }   //WORKING

    public static void setZip(int x) {
        zipCode = x;
    }   //WORKING

    public static Map<String, Object> jsonToMap(String str) {
        Map<String, Object> map = new Gson().fromJson(
                str, new TypeToken<HashMap<String, Object>>() {
                }.getType()
        );
        return map;
    }   //WORKING

    public static void dataPull(){
        String API_KEY = "974c49846451be7321f8e80b69d91954";
        int LOCATION_ZIP = Main.getZip();
        String urlString = "http://api.openweathermap.org/data/2.5/weather?zip=" + LOCATION_ZIP + ",us&units=imperial&appid=" + API_KEY;

        System.out.println(urlString);
        try {
            StringBuilder result = new StringBuilder();
            URL url = new URL(urlString);
            URLConnection conn = url.openConnection();
            BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line;
            while ((line = rd.readLine()) != null) {
                result.append(line);
            }

            rd.close();

            Map<String, Object> respMap = jsonToMap(result.toString());
            Map<String, Object> mainMap = jsonToMap(respMap.get("main").toString());
            Map<String, Object> windMap = jsonToMap(respMap.get("wind").toString());
            Map<String, Object> sysMap = jsonToMap(respMap.get("sys").toString());

            String WeatherDetails =""+respMap.get("weather");
            WeatherDetails = WeatherDetails.substring(2, WeatherDetails.length() - 2);
            Map<String, String> weatherMap = new HashMap<String, String>();
            String parts[]=WeatherDetails.split(", ");
            for(String part:parts){
                String data[] = part.split("=");
                String Key = data[0].trim();
                String value = data[1].trim();
                weatherMap.put(Key,value);
            }

            setTown(""+respMap.get("name"));
            setTemp(""+mainMap.get("temp"));
            setCondt(""+weatherMap.get("main"));
            setFeelTemp(""+mainMap.get("feels_like"));

            SearchData test = new SearchData((""+mainMap.get("temp")),(""+mainMap.get("feels_like")),(""+respMap.get("name")),(""+weatherMap.get("main")));

        } catch (IOException e) { System.out.println(e.getMessage()); }
    }   //IN PROGRESS

    public static void setTown(String townName){ town=townName; } //WORKING

    public static void setTemp(String tempNum){
        double tempNumber = Math.round(Double.parseDouble(tempNum));
        int tempNumberInt = (int)tempNumber;
        temp=""+tempNumberInt;
    }     //WORKING

    public static void setCondt(String conditons){ condt=conditons; };      //WORKING

    public static void setFeelTemp(String feelLikeTemp){
        double feelTempLoc = Math.round(Double.parseDouble(feelLikeTemp));
        int feelTempInt = (int)feelTempLoc;
        feelTemp = ""+(feelTempInt);

    }   //WORKING

    public static void main(String[] args) {

        launch(args);

    }       //WORKING
}

class SearchData{
    //template object for storing data from searches
    int zipCode = 0;

    String currentTemp;
    String feelsLikeTemp;
    String town;
    String condt;

    SearchData(String currentTemp, String feelsLikeTemp, String town,String condt){
        this.currentTemp = currentTemp;
        this.feelsLikeTemp = feelsLikeTemp;
        this.town = town;
        this.condt = condt;
    }

    @Override
    public String toString() {
        return "SearchData{" +
                "zipCode=" + zipCode +
                ", currentTemp='" + currentTemp + '\'' +
                ", feelsLikeTemp='" + feelsLikeTemp + '\'' +
                ", town='" + town + '\'' +
                ", condt='" + condt + '\'' +
                '}';
    }
}

