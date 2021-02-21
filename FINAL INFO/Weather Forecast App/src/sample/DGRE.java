import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.util.*;

import com.google.gson.*;
import com.google.gson.reflect.*;
import sample.Main;

public class DGRE{

	public static Map<String, Object> jsonToMap(String str){
		Map<String, Object> map = new Gson().fromJson(
				str, new TypeToken<HashMap<String, Object>>() {}.getType()
			);
			return map;
	}

	//public static void main(String[] args){
	public static void dataPull(){
		Scanner kbd = new Scanner(System.in);
		
		String API_KEY = "974c49846451be7321f8e80b69d91954";
		int LOCATION_ZIP = Main.getZip();
		String urlString = "http://api.openweathermap.org/data/2.5/weather?zip=" + LOCATION_ZIP +",us&units=imperial&appid=" + API_KEY;

		try {
			StringBuilder result = new StringBuilder();
			URL url = new URL(urlString);
			URLConnection conn = url.openConnection();
			BufferedReader rd = new BufferedReader(new InputStreamReader (conn.getInputStream()));
			String line;
			while ((line = rd.readLine()) != null){
				result.append(line);
			}

			rd.close();
			//System.out.println(result);

			Map<String, Object> respMap = jsonToMap(result.toString());
			Map<String, Object> mainMap = jsonToMap(respMap.get("main").toString());
			Map<String, Object> windMap = jsonToMap(respMap.get("wind").toString());
			Map<String, Object> sysMap = jsonToMap(respMap.get("sys").toString());
			
			System.out.println(sysMap);

			System.out.println("Current Temperature: " + mainMap.get("temp"));
			System.out.println("Current Humidity: " + mainMap.get("humidity"));
			System.out.println("Wind Speeds: " + windMap.get("speed"));
			System.out.println("Wind Angle: "+ windMap.get("deg"));
			System.out.println("Country: "+ sysMap.get("country"));

		} catch (IOException e){
			System.out.println(e.getMessage());
		}

		
	}
}