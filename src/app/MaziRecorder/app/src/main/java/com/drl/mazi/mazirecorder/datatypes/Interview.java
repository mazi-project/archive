package com.drl.mazi.mazirecorder.datatypes;

import android.content.ContentValues;
import android.content.Context;
import android.content.SharedPreferences;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.provider.BaseColumns;

import com.drl.mazi.mazirecorder.utils.ObjectSerializer;

import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by lutz on 16/09/15.
 */
public class Interview implements Serializable {

    public static final String SHARED_PREFS_NAME = "interview-preferences";
    public static final int DB_VERSION = 1;

    public String text = null;
    public String author = null;
    public String role = null;
    public File image = null;
    public ArrayList<Attachment> attachments;

    public Interview() {
        this.attachments = new ArrayList<Attachment>();
    }

    public void setImage(File image) {
        this.image = image;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void save(Context context) {
        SharedPreferences.Editor editor = context.getSharedPreferences(SHARED_PREFS_NAME, Context.MODE_PRIVATE).edit();

        editor.putString("author",this.author);
        editor.putString("text",this.text);
        editor.putString("role",this.role);
        try {
            editor.putString("attachments", ObjectSerializer.serialize(this.attachments));
        } catch (IOException e) {
            e.printStackTrace();
        }
        editor.commit();
    }

    public void load(Context context) {

        SharedPreferences pref = context.getSharedPreferences(SHARED_PREFS_NAME, Context.MODE_PRIVATE);

        this.author = pref.getString("author",null);
        this.text = pref.getString("text",null);
        this.role = pref.getString("role",null);

        try {
            this.attachments = (ArrayList<Attachment>) ObjectSerializer.deserialize(pref.getString("attachments", ObjectSerializer.serialize(new ArrayList<Attachment>())));
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
