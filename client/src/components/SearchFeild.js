import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { MenuItem } from '@material-ui/core/Menu';
import "../css/App.css"
import { withStyles } from '@material-ui/core/styles';


let suggestions = []


function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{inputRef: ref,
        classes: {
          input: classes.input,
        },
        ...other,
      }}/>
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div" >
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square >
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
      const keep =
          suggestion.label.toLowerCase().includes(inputValue);
      return keep;
    });
}

const styles = theme => ({
  container: {
    fontFamily: "Oswald",
    flexGrow: 1,
    position: 'relative',
    height: 50,
    minWidth: "250px",
    marginTop: "24px"
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 2,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    width: "max-content"
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    
  },
});

class IntegrationAutosuggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    };
  };

 
  onSuggestionSelected=(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) =>{
    this.props.getDrink(3, suggestion.id)
    this.setState({
      value: '',
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.updateSuggestions()
    }, 2000);
    
  }

  updateSuggestions = () => {

    const newArr = [...this.props.drinks]
    suggestions=[];
    newArr.forEach((entry)=>{
      suggestions.push({ id: entry.idDrink, label: entry.strDrink})
    })
  }

  // componentDidUpdate(prevProps) {
  //   if(prevProps.alcSwitch !== this.props.alcSwitch)
  //     setTimeout(() => {
  //       this.updateSuggestions();
  //     }, 50);
  // }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionSelected={this.onSuggestionSelected}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        highlightFirstSuggestion={true}
        inputProps={{
          classes,
          placeholder: 'Search by name',
          value: this.state.value,
          onChange: this.handleChange,
        }}
      />
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
  drinks: PropTypes.array.isRequired
};

export default withStyles(styles)(IntegrationAutosuggest);
