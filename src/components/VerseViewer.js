import React, { useState } from 'react'

import Verse from './HoverableDiv'

export default function VerseViewer() {

    return (
        <>
        <div>Verse here</div>
        <Verse verseRef="Rom 8:10"/>,<Verse verseRef="Rom 8:9-10"/>
        <div>Some other text here</div>
        </>
    )
}