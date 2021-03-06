import React, { useState } from 'react'

import Verse from './HoverableDiv'

const starting_text = "Paste your ministry portion / outline with verse references here. Then push the green button. John 3:16. Brackets mean the program has recognized the verse reference. You can click the the references to show the verse";

export default function VerseViewer() {
    const [textStuff, setText] = useState(starting_text)
    const [clean, setClean] = useState("");
    const [showAll, setShowAll] = useState(false);

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
        const display = lines.map( line => {
            const verses = line.matchAll(/{([\S\s]+?)}/igm);

            const verseObject = [];
            for(const verse of verses){
                const text = [];
                verseObject.push({ ref: verse[1], text: text})
            }
            return { text: line, verses: verseObject, key: line };
            
        });
        setClean(display);
    }

    function renderVerses(verses){
        return verses.map( verse => {
            return <Verse verseRef={verse.ref} key={verse.ref} showAll={showAll}/>
        })
    }

    function render(){
        if( clean === ""){
            return <></>
        }

        return (
            <>
            {clean.map(line => { return <div key={line.text}>
                
                    <div className="outline-text" key={line.text}>{line.text}</div>
                    {renderVerses(line.verses)}
                    <div className="outline-text" key={line.text+"space"}>&nbsp;</div>
                </div> } )}
            </>
        );
        }

    

    function handleChange(event){
        setText(event.target.value);
    }

    function handleHideAll(){
        setShowAll(!showAll);
    }

    return (
        <>
        <div className="main">
            <div className="parser">
                <div className="parser-heading">Insert Ministry here</div>
                <button className="btn btn-primary" onClick={()=>parse()}>Go!</button>
                <textarea onChange={handleChange} value={textStuff}/>
                <div className="footer">??? Jermin Tiu 2021</div>
            </div>
            <div className="viewer">
                <div className="viewer-heading">Transformation!</div>
                <button onClick={() => handleHideAll()}>Hide/Show</button>
                {render()}
                
            </div>
        </div>
        

        </>
    )
}