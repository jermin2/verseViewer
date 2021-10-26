import React, { useState } from 'react'

import Verse from './HoverableDiv'
import axios from 'axios'

export default function VerseViewer() {
    const [textStuff, setText] = useState("a")
    const [clean, setClean] = useState("");

    function parse(){
        //console.log(textStuff)

        // Check for valid references
        // Replace all the random new lines stuff with \n
        var text = textStuff.replace(/(\r\n)|\r|\n/igm, '\n')

        // add a new lines to everything that start with [a.] or [IV.]
        text = text.replace(/(^(?:[A-Z]{1,2}|[a-z]{1,2}|[\d]{1,2})\.)/igm, '\n$&' )

        // Replace any \n that isn't followed by another \n with a space
        text = text.replace(/(\n)(?!\n)/igm, ' ')
        text = text.replace(/\n {1}/igm, '\n')

        // find anything that looks like (optional number)(capital letter)(2-3 letters)(a dot-optional)(space)(1-3numbers-chapter part)
        // followed by colon, at least one number, and either 
        // 1. a letter from a-c - i.e 1 Cor 15:45b
        // 2. a dash followed by some numbers to represent a range of verses John 3:3-6
        // 3. a comma followed by more numbers, John 3:6, 8
        // any combination of the above 3 points. 
        text = text.replace(/(\d )?[A-Z][a-z]{2,3}\.?(((;)? \d{1,3}:\d+(([a-c])?|(-\d+)?|(, \d+)?)+))+/gm, '{$&}')

        const lines = text.split('\n')
        const display = []
        lines.map( line => {
            const verses = line.matchAll(/{([\S\s]+?)}/igm);

            const verseObject = [];
            for(const verse of verses){

                const text = fetchVerse(verse[1]);

                verseObject.push({ ref: verse[1], text: text})
            }
            
            const lineObject = { text: line, verses: verseObject };
            display.push(lineObject);
            
        });
        

        console.log(display);

        setClean(display);

    }
    function fetchVerse(ref){
        var verseText = []
        return verseText;
      
    }

    function renderVerseText(verseText){
        console.log("renderVerseText", verseText);
        return verseText.map( text => {
            return<div>{text}</div>
        })
    }

    function renderVerses(verses){
        console.log("renderVerse", verses);
        return verses.map( verse => {
            return <><Verse verseRef={verse.ref} /></>
            return <><div className="verse-ref">{verse.ref}</div><div>{renderVerseText(verse.text)}</div>  </>
        })
    }

    function render(){
        console.log("render", clean);
        if( clean === ""){
            return <></>
        }

            return (
                <>
                {clean.map(line => { return <>
                    
                        <div>{line.text}</div>
                        {renderVerses(line.verses)}
                    </> } )}
                </>
            );
        }

    

    function handleChange(event){
        setText(event.target.value);
    }

    return (
        <>
        <div className="main">
            <div className="parser">
                <div className="parser-heading">Insert Ministry here</div>
                <textarea onChange={handleChange} value={textStuff}/>
                <button className="btn btn-primary" onClick={()=>parse()}>Go!</button>
            </div>
            <div className="viewer">
                <div className="viewer-heading">Transformation!</div>
                {render()}
            </div>
        </div>

        </>
    )
}