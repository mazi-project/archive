package com.drl.mazi.mazirecorder;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.drl.mazi.mazirecorder.datatypes.Questions;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class QuestionActivity extends AppCompatActivity {

    private static final String TAG = "MAZI-APP";

    public Questions questions = null;

    public ListView questionListView;
    private ArrayAdapter<String> mAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_question);

        questionListView = (ListView) findViewById(R.id.questionListView);

        this.questions = new Questions(getApplicationContext());



        Log.e(TAG, this.questions.json.toString());

    }

    private void populateQuestionList() {

        for (int i = 0; i < this.questions.names.size(); i++) {
            Log.e(TAG, this.questions.names.get(i));
        }

    }

}
