package com.drl.mazi.mazirecorder.datatypes;

import android.content.Context;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

/**
 * Created by lutz on 08/07/16.
 */
public class Questions {

    static final String QUESTION_FILE = "questions.json";

    public JSONArray json;
    public ArrayList<String> names;

    public Questions(Context context) {

        this.names = new ArrayList<String>();

        try {
            this.json = new JSONArray(loadJSONFromAsset(QUESTION_FILE,context));
            this.names = new ArrayList<String>();
            for (int i = 0; i < this.json.length(); i++) {
                JSONObject row = this.json.getJSONObject(i);
                this.names.add(row.getString("name"));
            }
        } catch (JSONException e) {
            this.json = new JSONArray();
            e.printStackTrace();
        }
    }

    private String loadJSONFromAsset(String filename, Context context) {
        String json = null;
        try {

            InputStream is = context.getAssets().open(filename);
            int size = is.available();
            byte[] buffer = new byte[size];
            is.read(buffer);
            is.close();
            json = new String(buffer, "UTF-8");

        } catch (IOException ex) {
            ex.printStackTrace();
            return null;
        }
        return json;

    }
}
