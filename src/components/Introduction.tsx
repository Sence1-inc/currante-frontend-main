
import React from 'react';
import IntroItem from './IntroItem';


interface IntroProps {
     introduction: IntroItemProps[];
}

const Introduction: React.FC<IntroProps> = ({introduction})=> {
    return (
        <section className="" id="introduction">
            <h2>Introduction to Currante</h2>
            {introduction.map((introItem: IntroItemProps)=>{
                    return <IntroItem key={index} title={introItem.title} desc={introItem.desc} image={introItem.image} />
            })}
        </section>
    );
}

export default Introduction;