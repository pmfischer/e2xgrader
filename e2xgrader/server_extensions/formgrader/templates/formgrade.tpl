{%- extends 'basic.tpl' -%}
{% from 'formgrade_macros.tpl' import nav, header %}
{% from 'mathjax.tpl' import mathjax %}

{%- block header -%}
<!DOCTYPE html>
<html>
<head>
{{ header(resources) }}

{% for css in resources.inlining.css -%}
    <style type="text/css">
    {{ css }}
    </style>
{% endfor %}


<!-- Loading mathjax macro -->
{{ mathjax( resources.base_url + '/' + resources.mathjax_url + '?config=TeX-AMS-MML_HTMLorMML-full') }}

<link rel="stylesheet" href="{{ resources.base_url }}/formgrader/static/css/formgrade.css" />
<style type="text/css">
  div.prompt {
    min-width: 5em;
  }

  div.panel.panel-primary.nbgrader_cell {
    width: -webkit-calc(100% - 5.8em);
    width:    -moz-calc(100% - 5.8em);
    width:         calc(100% - 5.8em);
  }

  .panel-body {
    position: relative;
    min-height: 17.5em;
  }

  .annotationarea {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

  }

  .btn-edit {
    background-color: rgba(184, 184, 92, .5);
    border-color: rgb(92, 92, 47);
  }

  .btn-edit:hover {
    background-color: #ee0;
    border-color: #dd0;
  }

.paint-controls {
  position: sticky;
  top: 60px;
  /*left: -6em;*/
  max-width: 6em;
  border: 1px solid black;
}

.color input {
  display: block;
  width: 100%;
  height: 2.5em;
}

.brush button {
  display: block;
  width: 2.5em;
}

.clear {
  width: 100%;
  height: 2.5em;
}

.circle-5 {
  display: inline-block;
  background-color: black;
  height: 5px;
  width: 5px;
  border-radius: 50%;

}

.circle-10 {
  display: inline-block;
  background-color: black;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  margin-left: 3px;
}

.circle-15 {
  display: inline-block;
  background-color: black;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  margin-left: 4px;
}

.circle-20 {
  display: inline-block;
  background-color: black;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-left: 5px;
}

.line-width label {
  width: 100%;
}
.switch {
  position: relative;
  display: inline-block;
  vertical-align: top;
  width: 56px;
  height: 20px;
  padding: 0px;
  background-color: white;
  border-radius: 18px;
  box-shadow: inset 0 -1px white, inset 0 1px 1px rgba(0, 0, 0, 0.05);

  box-shadow: 0 0 1px 1px #ddd;

  cursor: pointer;
  background-image: -webkit-linear-gradient(top, #eeeeee, white 25px);
  background-image: -moz-linear-gradient(top, #eeeeee, white 25px);
  background-image: -o-linear-gradient(top, #eeeeee, white 25px);
  background-image: linear-gradient(to bottom, #eeeeee, white 25px);
}

.switch-input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.switch-label {
  position: relative;
  display: block;
  height: inherit;
  font-size: 10px;
  text-transform: uppercase;
  background: #eceeef;
  border-radius: inherit;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.15);
  -webkit-transition: 0.15s ease-out;
  -moz-transition: 0.15s ease-out;
  -o-transition: 0.15s ease-out;
  transition: 0.15s ease-out;
  -webkit-transition-property: opacity background;
  -moz-transition-property: opacity background;
  -o-transition-property: opacity background;
  transition-property: opacity background;
}
.switch-label:before, .switch-label:after {
  position: absolute;
  top: 55%;
  margin-top: -.5em;
  line-height: 1;
  -webkit-transition: inherit;
  -moz-transition: inherit;
  -o-transition: inherit;
  transition: inherit;
}
.switch-label:before {
  content: attr(data-off);
  right: 11px;
  color: #aaa;
  text-shadow: 0 1px rgba(255, 255, 255, 0.5);
}
.switch-label:after {
  content: attr(data-on);
  left: 11px;
  color: white;
  text-shadow: 0 1px rgba(0, 0, 0, 0.2);
  opacity: 0;
}
.switch-input:checked ~ .switch-label {
  background: #47a8d8;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15), inset 0 0 3px rgba(0, 0, 0, 0.2);
}
.switch-input:checked ~ .switch-label:before {
  opacity: 0;
}
.switch-input:checked ~ .switch-label:after {
  opacity: 1;
}

.switch-handle {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 10px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  background-image: -webkit-linear-gradient(top, white 40%, #f0f0f0);
  background-image: -moz-linear-gradient(top, white 40%, #f0f0f0);
  background-image: -o-linear-gradient(top, white 40%, #f0f0f0);
  background-image: linear-gradient(to bottom, white 40%, #f0f0f0);
  -webkit-transition: left 0.15s ease-out;
  -moz-transition: left 0.15s ease-out;
  -o-transition: left 0.15s ease-out;
  transition: left 0.15s ease-out;
}
.switch-handle:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -6px 0 0 -6px;
  width: 12px;
  height: 12px;
  background: #f9f9f9;
  border-radius: 6px;
  box-shadow: inset 0 1px rgba(0, 0, 0, 0.02);
  background-image: -webkit-linear-gradient(top, #eeeeee, white);
  background-image: -moz-linear-gradient(top, #eeeeee, white);
  background-image: -o-linear-gradient(top, #eeeeee, white);
  background-image: linear-gradient(to bottom, #eeeeee, white);
}
.switch-input:checked ~ .switch-handle {
  left: 37px;
  box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.2);
}

.switch-green > .switch-input:checked ~ .switch-label {
  background: #4fb845;
}

div.prompt {
  min-width: 6.8em;
  color:  black;
}

</style>

</head>
{%- endblock header -%}

{% block body %}
<body>
  {{ nav(resources) }}
  <div class="container">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <span>{{ resources.notebook_id }}</span>
          <span class="pull-right">Submission {{ resources.index + 1 }} / {{ resources.total }}</span>
        </h4>
      </div>
      <div class="panel-body">
        <div id="notebook" class="border-box-sizing">
          <div class="container" id="notebook-container">
            {{ super() }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="help"><span class="glyphicon glyphicon-question-sign"></span></div>
  <div id="statusmessage"></div>
</body>
{%- endblock body %}

{% block footer %}
</html>
{% endblock footer %}

{% macro score(cell) -%}
  <span class="glyphicon glyphicon-ok save-icon score-saved"></span>
  <div class="pull-right">
    <span class="btn-group btn-group-sm scoring-buttons" role="group">
      <button type="button" class="btn btn-warning mark-graded">Resolve</button>
      <button type="button" class="btn btn-success full-credit">Full credit</button>
      <button type="button" class="btn btn-danger no-credit">No credit</button>
    </span>
    <span>
      <input class="score tabbable" id="{{ cell.metadata.nbgrader.grade_id }}" style="width: 4em;" type="number" /> / {{ cell.metadata.nbgrader.points | float | round(2) }}
    </span>
    <span style="margin-left: 1em;">
      + <input class="extra-credit tabbable" id="{{ cell.metadata.nbgrader.grade_id }}_extra_credit" style="width: 3em;" type="number" /> (extra credit)
    </span>
  </div>
{%- endmacro %}


{% macro nbgrader_heading(cell) -%}
<div class="panel-heading">
{%- if cell.metadata.nbgrader.solution or cell.metadata.nbgrader.task -%}
  {%- if cell.metadata.nbgrader.task -%}
  <span class="nbgrader-label">Student's task</span>
  {%- else -%}
  <span class="nbgrader-label">Student's answer</span>
  {%- endif -%}
  <span class="glyphicon glyphicon-ok comment-saved save-icon"></span>
  {%- if cell.metadata.nbgrader.grade or cell.metadata.nbgrader.task  -%}
  {{ score(cell) }}
  {%- endif -%}
  <span style="margin-left: 2em;">Annotation Mode</span>
  <label class="switch">
    <input type="checkbox" class="switch-input" name="annotate">
    <span class="switch-label" data-on="On" data-off="Off"></span>
    <span class="switch-handle"></span>

  </label>

  
{%- elif cell.metadata.nbgrader.grade -%}
  <span class="nbgrader-label"><code>{{ cell.metadata.nbgrader.grade_id }}</code></span>
  {{ score(cell) }}
{%- endif -%}
</div>
{%- endmacro %}

{% macro nbgrader_footer(cell) -%}
{%- if cell.metadata.nbgrader.solution or cell.metadata.nbgrader.task -%}
<div class="panel-footer">
  <div><textarea id="{{ cell.metadata.nbgrader.grade_id }}-comment" class="comment tabbable"></textarea></div>
</div>
{%- endif -%}
{%- endmacro %}

{%- macro annotation_canvas(cell) -%}
<canvas class='annotationarea' id='{{ cell.metadata.nbgrader.grade_id }}-canvas' style="touch-action: none;">
</canvas>
{%- endmacro -%}

{% macro annotation(cell) %}
  {%- if cell.metadata.nbgrader.solution -%}
  <div class='paint-controls'>
    <div class='brush btn-group' data-toggle="buttons">
      <label class="btn active">
        <input type="radio" name="brush" value="pencil">
        <span class="glyphicon glyphicon-pencil"></span>
      </label>
      <label class="btn">
        <input type="radio" name="brush" value="eraser">
        <span class="glyphicon glyphicon-erase"></span>
      </label>

    </div>
    <div class='color'><input type="color" name="color-picker" value="#aaff00"></div>

    <div class='line-width btn-group' data-toggle="buttons">
      <label class="btn active">
        <input type="radio" name="line-width" value="5">
        <span class="circle-5"></span>
      </label>
      <label class="btn">
        <input type="radio" name="line-width" value="10">
        <span class="circle-10"></span>
      </label>
      <label class="btn">
        <input type="radio" name="line-width" value="15">
        <span class="circle-15"></span>
      </label>
      <label class="btn">
        <input type="radio" name="line-width" value="20">
        <span class="circle-20"></span>
      </label>

    </div>
    <div class='advanced-controls'>
      <button class="glyphicon glyphicon-trash clear"></button>
    </div>
  </div>
  
  {%- endif -%}
{% endmacro %}


{% block markdowncell scoped %}
<div class="cell border-box-sizing text_cell rendered">
  {%- if 'nbgrader' in cell.metadata and cell.metadata.nbgrader.solution -%}
    <div class="prompt input_prompt">
      {{ annotation(cell) }}
    </div>
  {%- else -%}
  {{ self.empty_in_prompt() }}
  {%- endif -%}

  {%- if 'nbgrader' in cell.metadata and (cell.metadata.nbgrader.solution or cell.metadata.nbgrader.grade or cell.metadata.nbgrader.task ) -%}
  <div class="panel panel-primary nbgrader_cell">
    {{ nbgrader_heading(cell) }}
    <div class="panel-body">
      {{ annotation_canvas(cell) }}
      
      <div class="text_cell_render border-box-sizing rendered_html">
        {{ cell.source  | markdown2html | strip_files_prefix | to_choicecell }}
      </div>
    </div>
    {{ nbgrader_footer(cell) }}
  </div>

  {%- else -%}

  <div class="inner_cell">
    <div class="text_cell_render border-box-sizing rendered_html">
      {{ cell.source  | markdown2html | strip_files_prefix }}
    </div>
  </div>

  {%- endif -%}

</div>
{% endblock markdowncell %}

{% block input %}
  {%- if 'nbgrader' in cell.metadata and (cell.metadata.nbgrader.solution or cell.metadata.nbgrader.grade or cell.metadata.nbgrader.task) -%}
  <div class="panel panel-primary nbgrader_cell">
    {{ nbgrader_heading(cell) }}
    <div class="panel-body">
      {{ annotation_canvas(cell) }}
      <div class="input_area">
        {{ cell.source | highlight_code_with_linenumbers(metadata=cell.metadata) }}
      </div>
    </div>
    {{ nbgrader_footer(cell) }}
  </div>

  {%- else -%}

  <div class="inner_cell">
    <div class="input_area">
      {{ cell.source | highlight_code_with_linenumbers(metadata=cell.metadata) }}
    </div>
  </div>
  {%- endif -%}

{% endblock input %}
{% block in_prompt -%}
<div class="prompt input_prompt">
  {{ annotation(cell) }}
</div>
{%- endblock in_prompt %}
