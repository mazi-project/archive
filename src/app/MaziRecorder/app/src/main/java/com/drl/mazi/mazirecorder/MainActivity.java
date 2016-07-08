package com.drl.mazi.mazirecorder;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.EditText;

import com.drl.mazi.mazirecorder.datatypes.Interview;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MAZI-APP";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        Interview interview = new Interview();
        interview.load(getApplicationContext());

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    // open dialog to input name
    public void openNewInterviewDialog(View view) {
        final EditText interviewAuthorInput = new EditText(this);
        AlertDialog dialog = new AlertDialog.Builder(this)
                .setTitle("Add a new Interview")
                .setMessage("Name of the interviewed person")
                .setView(interviewAuthorInput)
                .setPositiveButton("Add", new DialogInterface.OnClickListener() {
                    // on add clicked
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        Interview interview = new Interview();
                        interview.setAuthor(interviewAuthorInput.getText().toString());
                        interview.save(getApplicationContext());
                        startQuestionActivity(interview);

                        //Snackbar.make(view, "Interview for "+interview.author+" created", Snackbar.LENGTH_LONG)
                        //        .setAction("Action", null).show();
                    }
                })
                .setNegativeButton("Cancel", null)
                .create();
        dialog.show();
    }

    public void startQuestionActivity(Interview interview) {

        Intent intent = new Intent(this, QuestionActivity.class);
        intent.putExtra("interview", interview);
        startActivity(intent);
    }
}
