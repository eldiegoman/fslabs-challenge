import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as nodeActions from "../state/modules/nodes/actions/nodes";
import * as blocksActions from "../state/modules/blocks/actions/blocks.creators";
import Node from "../components/Node";
import { Typography, Box } from "@material-ui/core";

export class Nodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedNodeURL: null,
    };
    this.toggleNodeExpanded = this.toggleNodeExpanded.bind(this);
  }

  componentDidMount() {
    const { nodeActions } = this.props;
    if (nodeActions) nodeActions.checkNodeStatuses(this.props.nodes.list);
  }

  toggleNodeExpanded(node) {
    const { blocksActions } = this.props;
    const isEqual = node.url === this.state.expandedNodeURL;

    this.setState(
      {
        expandedNodeURL: isEqual ? null : node.url,
      },
      () => {
        const active = node.url === this.state.expandedNodeURL;
        const { blocks } = node;
        if (active && (!blocks || blocks.length <= 0))
          blocksActions.getBlockStart(node);
      }
    );
  }

  render() {
    const { nodes } = this.props;
    return (
      <Box paddingTop={7}>
        <Typography variant="h4" component="h1">
          <strong style={{ color: "#000" }}>Nodes</strong>
        </Typography>
        {nodes.list.map((node) => (
          <Node
            node={node}
            key={node.url}
            expanded={node.url === this.state.expandedNodeURL && !node.loading}
            toggleNodeExpanded={this.toggleNodeExpanded}
          />
        ))}
      </Box>
    );
  }
}

Nodes.propTypes = {
  nodeActions: PropTypes.object.isRequired,
  blocksActions: PropTypes.object.isRequired,
  nodes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    nodes: state.nodes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    nodeActions: bindActionCreators(nodeActions, dispatch),
    blocksActions: bindActionCreators(blocksActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nodes);
