import React, {useEffect, useState} from 'react'
import axios from 'axios'

const HoverableDiv = ({ handleMouseOver, handleMouseOut, handleClick, verseRef }) => {

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleClick} className="verse-ref">
      {verseRef}
    </div>
  );
};


const HoverText = (props) => {
  // eslint-disable-next-line
  const [verseText, setVerseText] = useState(props.verseText);

  if(verseText===""){
    return <div key={verseText}>{verseText}</div>
  }
  return (
    <div>
      {verseText.map(verse => {
        return <div key={verse}>{verse}</div>
      })}
    </div>
  );
};


const Verse = (data) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [verseRef, setVerseRef] = useState(data.verseRef);
  const [verseText, setVerseText] = useState("")

  // Used to hide or show everything
  useEffect( () => {
    setIsClicked(data.showAll)
  },[data.showAll])

  // Fetch the verse from the LSM website
  useEffect( () => {

    setVerseRef(data.verseRef)

    if(verseRef !== ""){
      const url = `https://api.lsm.org/recver.php?String='${verseRef}'&Out=json`
      axios.get(url).then( response => {
        const verseText = response.data.verses.map (verse => {
          return (verse.ref + ": " + verse.text + '\x0a');
        })
        setVerseText(verseText)
      }).catch( e => {console.log(e); console.log("failed to fetch", data.verseRef)})
    }
  // eslint-disable-next-line
  }, [data.verseRef])


  // Backup fetch in case the first one fails. Triggers on user click
  useEffect( () => {
    if(verseRef !== "" && verseText.length===0){
      const url = `https://api.lsm.org/recver.php?String='${verseRef}'&Out=json`
      axios.get(url).then( response => {
         const verseText = response.data.verses.map (verse => {
          return (verse.ref + ": " + verse.text + '\x0a');
        })
        setVerseText(verseText)
      }).catch( e => {console.log(e); console.log("failed to fetch 2", data.verseRef)})
    }
  // eslint-disable-next-line
  }, [isClicked])

  const handleMouseOver = () => {
    // setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  }

  return (
    <div>
      {/* Hover over this div to hide/show <HoverText /> */}
      <HoverableDiv
        handleMouseOver={handleMouseOver}
        handleMouseOut={handleMouseOut}
        handleClick={handleClick}
        verseRef={verseRef}
      />
      {(isHovering || isClicked) && <HoverText verseText={verseText}/>}
    </div>
  );
};

export default Verse