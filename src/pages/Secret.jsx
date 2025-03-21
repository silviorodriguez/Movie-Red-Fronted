import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp, FaGlobe } from "react-icons/fa"; // Íconos
import "../styles/secret.css";

const ContactMe = () => {
  return (
    <div className="contact-me">
      <h2>Contact</h2>
      <p>Do not hesitate to contact me if you have any questions or proposals!</p>
      <ul className="contact-list">
        <li>
          <FaEnvelope className="icon" /> {/* Ícono de email */}
          <strong>Email:</strong>
          <a href="mailto:tuemail@example.com">Write to me at Email</a>
        </li>
        <li>
          <FaLinkedin className="icon" /> {/* Ícono de LinkedIn */}
          <strong>LinkedIn:</strong>
          <a
            href="https://www.linkedin.com/in/silvio-fernando-rodríguez-chacón-4179a0202/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <FaGithub className="icon" /> {/* Ícono de GitHub */}
          <strong>GitHub:</strong>
          <a
            href="https://github.com/silviorodriguez"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
        <li>
          <FaGlobe className="icon" /> {/* Ícono de portafolio */}
          <strong>briefcase:</strong>
          <a
            href="https://tuportafolio.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Briefcase
          </a>
        </li>
        <li>
          <FaWhatsapp className="icon" /> {/* Ícono de WhatsApp */}
          <strong>WhatsApp:</strong>
          <a
            href="https://wa.me/+573214205577"
            target="_blank"
            rel="noopener noreferrer"
          >
            to send messages
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ContactMe;