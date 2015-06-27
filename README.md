#Meteor tooltips

Tooltips can be more than just a tiny box with plain text. This lets you turn any template into a tooltip & use any element as a trigger
all with a nice looking material design animation.

##API
There are 2 parts: a `trigger` and a `tooltip`. The trigger is the thing you want the user to mouseover or click.
The trigger can be anything. A single line of text or icon or a big ol div. Here's how it looks using a line of text as a trigger:

    {{#tooltipTrigger name="myToolTip"}}Hover over me{{/tooltipTrigger}}
    
`name` is the name of the template that you want to appear as the tooltip. It can be as simple as a line of text or it could
 be a whole web page (don't do that). I like to have bullet points, each with a tip:
 
     <template name="myToolTip">
       <ul>
         <li class="has-error">*Required</li>
         <li>Thanks for hovering over me</li>
         <li>You can move your mouse into the tooltip & it won't go away.</li>
         <li>That means you can put links in your tooltips, if you want</li>
       </ul>
     </template>
     
 That's it. Have a gif.
 
 
 
