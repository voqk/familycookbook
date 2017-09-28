import * as React from 'react';
import * as showdown from 'showdown';
import { Panel } from 'react-bootstrap';
import { Recipe } from '../../Models';

interface RecipePrettyProps {
    recipe: Recipe;
}

showdown.setOption("tables", "true");
const converter = new showdown.Converter();

const renderHtml = (markdown: string) => {
    return { 
        __html: converter.makeHtml(markdown)
    };
}

export const RecipePretty = (props: RecipePrettyProps) => (
    <div>
        <div dangerouslySetInnerHTML={renderHtml(`# ${props.recipe.name}`)} />
        <div dangerouslySetInnerHTML={renderHtml(props.recipe.body)} />
    </div>
);