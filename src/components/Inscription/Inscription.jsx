
import { Button, Form, FormGroup, Label, Input as RsInput } from 'reactstrap';

import './Inscription.css';
import { Link } from 'react-router-dom';

const Inscription = () => {
  

  return (
    <div className="inscription-background">
      <Form className="inscription-form" >
        <FormGroup>
          <Label for="nom">Nom</Label>
          <RsInput type="text" name="email" id="nom"  />
        </FormGroup>
        <FormGroup>
          <Label for="prenom">Prenom</Label>
          <RsInput type="text" name="prenom" id="prenom"  />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <RsInput type="email" name="email" id="email"   />
        </FormGroup>
        <FormGroup>
          <Label for="password">Mot de passe</Label>
          <RsInput type="password" name="password" id="password"  />
        </FormGroup>
        <FormGroup>
          <Label for="telephone">Telephone</Label>
          <RsInput type="text" name="telephone" id="telephone"  />
        </FormGroup>
        
        <Button color="danger" className="mt-3" block type="submit">Inscription</Button>
        <p>Avez-vous deja un compte ? ? <Link to="/login">Connectez-vous.</Link> </p>
        <p>Cette page est protegee par Google reCAPATCHA pour garantir que vous n'etes pas un robot.</p>
        
      </Form>
    </div>
  );
}

export default Inscription;